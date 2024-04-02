import express from 'express';import { login,signup } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { User } from '../models/user.model.js';
import { upload } from '../middlewares/multur.middleware.js';
import { Request } from '../models/request.model.js';
const app = express.Router();
app.use(express.json());
app.post('/login',login);
app.post('/signup',upload.single('avatar'),signup);
app.get('/getUserDetails',verifyJWT,async(req,res)=>{
    const user =await User.findById(req.user._id);
    res.status(200).json({name:user.name,username:user.username,avatar:user.avatar});
});
app.put('/getUsers', async (req, res) => {
    const { name, username } = req.body;
    if (!name && !username) {
        res.status(400).json({ status: false, content: "Please enter a value" });
        return;
    }
    
    
    const users = await User.find({
        $or: [
            { username: username },
            { name: { $regex: new RegExp('^' + name + '$', "i") } } 
        ]
    }).select("-password");
    
    res.status(200).json({ status: true, results: users });
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
      console.log(previous_requests);
      if(previous_requests.length !== 0){
        res.status(400).json({status:false,content:'Friend Request sent earlier'});
        return;
      }
    const requ = new Request({status:'pending',sender:sender._id,receiver:receiver});
    requ.save();
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
    
})


export default app;