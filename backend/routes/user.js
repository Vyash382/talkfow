import express from 'express';import { login,signup } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { User } from '../models/user.model.js';
import { upload } from '../middlewares/multur.middleware.js';
import { Request } from '../models/request.model.js';
import { Chat } from '../models/chat.model.js';
import { emitEvent, getSockets } from '../utility/utils.js';
import mongoose, { isObjectIdOrHexString } from 'mongoose';
const app = express.Router();
app.use(express.json());
app.post('/login',login);
app.post('/signup',upload.single('avatar'),signup);
app.get('/getUserDetails',verifyJWT,async(req,res)=>{
    try {
        const user =await User.findById(req.user._id);
        res.status(200).json({name:user.name,username:user.username,avatar:user.avatar});
    } catch (error) {
        console.log(error);
    }
    
});
app.get('/getMy',verifyJWT,async(req,res)=>{
    try {
        const id = req.user._id.toString();
        res.status(200).json({id:id });
    } catch (error) {
        console.log(error);
    }
    
});
app.put('/getUsers', verifyJWT ,async (req, res) => {
    try {
        const { name, username } = req.body;
    if (!name && !username) {
        res.status(400).json({ status: false, content: "Please enter a value" });
        return;
    }
    
    const excludeId = req.user._id; 
    const users = await User.find({
        $and: [
            {
                _id: { $ne: excludeId }
            },
            {
                $or: [
                    { username: username },
                    { name: { $regex: new RegExp('^' + name + '$', "i") } } 
                ]
            }
        ]
    }).select("-password");
    
    res.status(200).json({ status: true, results: users });
    } catch (error) {
        console.log(error);
    }
    
});

app.post('/addFriend',verifyJWT,async(req,res)=>{
    try {
        const sender = await User.findById(req.user._id);
    const {receiver} = req.body;
   const previous_requests = await Request.find({
        $and: [
          { $or: [{ sender: sender._id }, { receiver: sender._id }] }, 
          { $or: [{ sender: receiver }, { receiver: receiver }] }, 
          { status: { $in: ["pending", "accepted"] } }
        ]
      });
    //   console.log(previous_requests);
      if(previous_requests.length !== 0){
        res.status(400).json({status:false,content:'Friend Request sent earlier'});
        return;
      }
    const requ = new Request({status:'pending',sender:sender._id,receiver:receiver});
    requ.save();
    const io = req.app.get("io");
    const members = [receiver];
    const getM = getSockets(members);
    io.to(getM).emit('SHOW_DIALOG',{ getM});
    res.status(200).json({status:true,requ});
    } catch (error) {
        res.status(400).json({status:false,content:'Internal Server Error'});
    }
});
app.post('/requeststatus',verifyJWT,async(req,res)=>{
    try {
        const sender = await User.findById(req.user._id);
    const {receiver} = req.body;
    const previous_requests = await Request.find({
        $and: [
          { $or: [{ sender: sender._id }, { receiver: sender._id }] }, 
          { $or: [{ sender: receiver }, { receiver: receiver }] }, 
          { status: { $in: ["pending", "accepted","rejected"] } }
        ]
    });
    if(previous_requests.length == 0){
        res.status(200).json({status:true,content:'rejected'});
        return;
    }
    res.status(200).json({status:true,content:previous_requests[0].status});
    } catch (error) {
        res.status(500).json({status:false,content:"Internal server error"});
    }
    // "receiver":"65fe8246eefb89881215c834"
});
app.post('/unsend',verifyJWT,async(req,res)=>{
    try {
        const sender =await User.findById(req.user._id);
    const {receiver} = req.body;
    
    
    const previous_requests = await Request.find({
        $and: [
          { $or: [{ sender: sender._id }, { receiver: sender._id }] }, 
          { $or: [{ sender: receiver }, { receiver: receiver }] }, 
          { status: { $in: ["pending","accepted"] } }
        ]
    });
    console.log(previous_requests);
    
    if(previous_requests.length == 0){
        res.status(400).json({status:false,content:'No requests'});
        return;
    }
    await Request.deleteMany({ _id: { $in: previous_requests.map(request => request._id) } });
    const io = req.app.get("io");
    const members = [sender._id,receiver];
    const getM = getSockets(members);
    const members2 = [receiver];
    const getM2 = getSockets(members2);
    io.to(getM).emit('REFETCH_CHATS',{ getM});
    io.to(getM2).emit('SHOW_DIALOG',{ getM2});
    res.status(200).json({ status: true, content: 'Requests deleted' });
    } catch (error) {
        console.log(error);
    }
    
});
app.get('/fetchRequests',verifyJWT,async(req,res)=>{
    try {
        const receiver = await User.findById(req.user._id);
    const array = await Request.find({ receiver: receiver._id, status: 'pending' }, { sender: 1, _id: 0 });
    let arr = [];
    for(let i=0;i<array.length;i++){
        let sender = array[i].sender;
        const com = await User.findById(sender);
        const obj = {
            idd:com._id,
            avatar: com.avatar,
            name: com.name,
        }
        arr[i]=obj;
    }
    res.status(200).send(arr);
    } catch (error) {
        console.log(error);
    }
    
});
app.put('/accept',verifyJWT,async(req,res)=>{
    try {
        const receiver = await User.findById(req.user._id);
    const {sender} = req.body;
    
    
   
    const arr = await Request.find({ receiver: receiver._id, sender: sender,status:'pending'});
    console.log(arr);
    const userId1 = receiver._id;
    const userId2 = new mongoose.Types.ObjectId(sender);
    
    const chat = await Chat.findOne({
        $and: [
            { groupchat: false }, 
            {
                members: {
                    $all: [
                        { $elemMatch: { $eq: userId1 } },
                        { $elemMatch: { $eq: userId2 } }
                    ]
                }   
            }
        ]
    });
    
    const mem =[userId1,userId2];
    if(!chat){
        
        const chat = new Chat({name:"BLC",groupchat:false,creator:userId1,members:mem});
        chat.save();
    }
    const io = req.app.get("io");
    const members = [userId1,userId2];
    const getM = getSockets(members);
    io.to(getM).emit('REFETCH_CHATS',{ getM});
    io.to(getM).emit('SHOW_DIALOG',{ getM});
    console.log(arr);
    arr[0].status='accepted';
    arr[0].save();
    res.send(arr[0]);
    } catch (error) {
        console.log(error);
    }
    
});
app.put('/reject',verifyJWT,async(req,res)=>{
    try {
        const receiver = await User.findById(req.user._id);
    const {sender} = req.body;
    console.log("sender"+sender);
    console.log("receiver"+receiver._id);
    const arr = await Request.find({ receiver: receiver._id, sender: sender,status:'pending'});
    await Request.deleteMany({ _id: { $in: arr.map(doc => doc._id) } });
    const io = req.app.get("io");
    const members = [receiver._id];
    const getM = getSockets(members);
    // io.to(getM).emit('REFETCH_CHATS',{ getM});
    io.to(getM).emit('SHOW_DIALOG',{ getM});
    res.json({msg:"Documents deleted successfully."});
    } catch (error) {
        console.log(error);
    }
    
});
app.get('/friends',verifyJWT,async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
    console.log(user._id);
    
    const arr = await Request.find({
        $or: [
          { receiver: user._id, status: 'accepted' },
          { sender: user._id, status: 'accepted' }
        ]
      });
      let ress =[];
    //   res.send(arr);
      
      for(let i=0;i<arr.length;i++){
        const obj = arr[i];
        let friendId;
        if (obj.sender.toString() === user._id.toString()) {
            friendId = obj.receiver;
        } else {
            friendId = obj.sender;
        }
    
        const friend = await User.findById(friendId);
        let obj2 = {
            id: friend._id,
            name: friend.name,
            avatar: friend.avatar
        }
        ress.push(obj2);
        }
    
      res.status(200).send(ress);
    } catch (error) {
        console.log(error);
    }
    
});
app.get('/logout',(req,res)=>{
    try{
    const options = {
        maxAge: 0,
        httpOnly: false,
        secure: true,
        sameSite: 'None'
    }
    res.status(200).cookie("accessToken","",options).json({status:true,message:"User logged Out Successsfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:false,content:"Internal server error"});
    }
});


export default app;