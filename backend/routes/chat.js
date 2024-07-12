import express from 'express';
import { Chat } from '../models/chat.model.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { emitEvent } from '../utility/utils.js';
import { User } from '../models/user.model.js';
import { Message } from '../models/message.model.js';
import { Request } from '../models/request.model.js';
// import axios from  'axios';
const app = express.Router();
app.use(express.json());

app.post('/newGroupChat', verifyJWT, async (req, res) => {
    const { name, members } = req.body;
    if (members.length < 2) {
        return res.status(400).json({ success: false, message: "Add more peoples for group chat" });
    }
    const allMembers = [...members, req.user._id];
    await Chat.create({
        name,
        groupchat: true,
        creator: req.user,
        members: allMembers
    });
    emitEvent(req, 'ALERT', allMembers, `Welcome to ${name} Group`);
    emitEvent(req, 'REFETCH_CHATS', members, 'You have been added in a group');
    res.status(201).json({ success: true, name, members: allMembers });
});

app.get('/my', verifyJWT, async (req, res) => {
    try {
        const id = req.user._id.toString();
        const my_chats = await Chat.find({ members: id });
        const arr =[];
        console.log(arr+'000000');
        for (let index = 0; index < my_chats.length; index++) {
            const element = my_chats[index];
            
            if(element.groupchat=='true'){
                const obj1 = {
                    name : element.name,
                    avatar : 'https://th.bing.com/th/id/OIP.kg6yJds7NHwm0Zz1AXOyBgHaEK?w=310&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',
                    id: element._id
                }
                arr.push(obj1);
                console.log(obj1);
            }
            else{
                
                if(element.members[0]!=id){
                    const request1 = await Request.findOne({
                        sender: element.members[0],
                        receiver: element.members[1],
                        status: 'accepted'
                      });
                    const request2 = await Request.findOne({
                        sender: element.members[1],
                        receiver: element.members[0],
                        status: 'accepted'
                      });
                      console.log(request1+"0001"+request2);
                      if(request1 || request2){
                    // console.log(id,element.members[0]);
                    // if(element.members[0]!=id){
                    const user = await User.findById(element.members[0]);
                    const obj1 = {
                        name : user.name,
                        avatar : user.avatar,
                        id: element._id
                    }
                    arr.push(obj1);
                    console.log(obj1);
                }
                // }
                }
                else{
                    
                    if(element.members[1]!=id){
                    const request1 = await Request.findOne({
                        sender: element.members[1],
                        receiver: element.members[0],
                        status: 'accepted'
                      });
                    const request2 = await Request.findOne({
                        sender: element.members[0],
                        receiver: element.members[1],
                        status: 'accepted'
                      });
                      
                      console.log(request1+"0002"+request2);
                    if(request1 || request2){
                    // console.log(id,element.members[1]);
                    
                    const user = await User.findById(element.members[1]);
                    const obj1 = {
                        name : user.name,
                        avatar : user.avatar,
                        id: element._id
                    }
                    arr.push(obj1);
                    console.log(obj1);
                    }
                    }
                
                }
            }
            
        }
        
        res.status(200).json({ success: true, arr });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error });
    }
});

app.put('/addMembers', verifyJWT, async (req, res) => {
    try {
        const { chatId, members } = req.body;

        if (!chatId) return res.status(400).json({ success: false, message: "Please specify the group chat" });
        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ success: false, message: "This chat is not present" });
        if (!chat.members.includes(req.user._id.toString())) {
            return res.status(403).json({ status: false, message: "You are not authorised" });
        }
        chat.members = [...chat.members, ...members];
        await chat.save();
        res.status(200).json({ success: true, chat });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
});

app.put('/removeMembers', verifyJWT, async (req, res) => {
    try {
        const { chatId, member } = req.body;

        if (!chatId) return res.status(400).json({ success: false, message: "Please specify the group chat" });

        const chat = await Chat.findById(chatId);
        if (!chat) return res.status(404).json({ success: false, message: "This chat is not present" });
        if (!chat.members.includes(req.user._id.toString())) {
            return res.status(403).json({ success: false, message: "You are not authorised" });
        }
        if (!chat.members.includes(member)) {
            return res.status(400).json({ success: false, message: "Member not found in the chat" });
        }

        const index = chat.members.indexOf(member);
        chat.members.splice(index, 1);
        await chat.save();
        const user = await User.findById(member);
        emitEvent(req, 'ALERT', chat.members, `${user.name} has been removed`);
        emitEvent(req, 'REFRESH_CHAT', chat.members);
        return res.status(200).json({ success: true, chat });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error });
    }
});

app.put('/leave', verifyJWT, async (req, res) => {
    try {
        const chatId = req.body.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        const index = chat.members.indexOf(req.user._id.toString());
        chat.members.splice(index, 1);
        if (chat.creator.toString() === req.user._id.toString()) {
            chat.creator = chat.members[0];
        }
        await chat.save();
        
        return res.status(200).json({ success: true, chat });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});
app.put('/kick', verifyJWT, async (req, res) => {
    try {
        console.log(req.body.member);
        const chatId = req.body.id;
        const tom = req.body.member;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        const index = chat.members.indexOf(tom.toString());
        chat.members.splice(index, 1);
        let r= false;
        if (chat.creator.toString() === tom.toString()) {
            chat.creator = chat.members[0];
            r=true;
        }
        console.log(tom+'  90');
        console.log(chat.members);
        await chat.save();
        return res.status(200).json({ success: r});
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

app.get('/chat/:id', verifyJWT, async (req, res) => {
    try {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        res.status(200).json({ success: true, chat });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

app.put('/changeName', verifyJWT, async (req, res) => {
    try {
        
        const { name } = req.body;
        const chatId = req.body.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        chat.name = name;
        await chat.save();
        res.status(200).json({ name:chat.name });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

app.put('/NewMembers', verifyJWT, async (req, res) => {
    try {
        const chatId = req.body.id;
        const user = req.user;
        const group = await Chat.findById(chatId);
        const groupMembers = group.members;
        const arr = await Request.find({
            $or: [
              { receiver: user._id, status: 'accepted' },
              { sender: user._id, status: 'accepted' }
            ]
          });
          let ress =[];
        ;
          
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
            let ress2 =[];
            for (let index = 0; index < ress.length; index++) {
                const element = ress[index];
                if(!groupMembers.includes(element.id)) {
                    
                    ress2.push(element);
                }
            }
            console.log(ress2);
            res.status(200).send(ress2);
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

app.put('/AddMembs', verifyJWT, async (req, res) => {
    try {
        const { id, members } = req.body;

        if (!Array.isArray(members)) {
            return res.status(400).json({ success: false, error: "Members should be an array" });
        }

        const group = await Chat.findById(id);
        if (!group) {
            return res.status(404).json({ success: false, error: "Group not found" });
        }

        group.members = [...new Set([...group.members, ...members])];

        await group.save();

        res.status(200).json({ success: true, group });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


app.put('/deleteC', verifyJWT, async (req, res) => {
    try {
        const chatId = req.body.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        if (chat.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorised" });
        }
        await Chat.deleteOne({ _id: chatId });
        res.status(200).json({ success: true, message: "Chat deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});
app.get('/myMessages/:id',verifyJWT,async(req,res)=>{
    const chatId = req.params.id;
    const { page  } = req.query;
  console.log(chatId,page);
    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;
  
    const chat = await Chat.findById(chatId);
  
        
    
    if (!chat) {
        
        res.status(400).json({success:false, message:"Chat not found"});
        return;
    } 
    if (!chat.members.includes(req.user._id.toString())){
        console.log('----------');
        res.status(400).json({success:false, message:"Not authorised"});
        return;
    }
    const [messages, totalMessagesCount] = await Promise.all([
      Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultPerPage)
        .populate("sender", "name")
        .lean(),
      Message.countDocuments({ chat: chatId }),
    ]);
  
    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;
    const msg2 = messages.reverse();
    const ret = [];
    for (let index = 0; index < msg2.length; index++) {
        const element = msg2[index];
        const user = await User.findById(element.sender);
        const avatar = user.avatar;
        
        // console.log(element.sender._id.toHexString());
        // console.log('dsfd');
        const obj = {
            sender:{
                _id: element.sender._id.toHexString(),
                avatar: avatar
            },
            content : element.content
        }
        ret.push(obj);
    }
    return res.status(200).json({
      success: true,
      messages: ret,
      totalPages,
    });
})
app.post('/members',verifyJWT,async(req,res)=>{
    try {
       
        const {chatId} = req.body;
        
        const myid = req.user._id.toString();
        const members=[];
        const chat = await Chat.findById(chatId);
        const mem2 = chat.members;
        for (let index = 0; index < mem2.length; index++) {
            const element = mem2[index];
            // if(element!=myid){
                members.push(element);
            // }
        }
        res.status(200).json({success:true, members});
    } catch (error) {
        console.log(error);
        res.status(404).json({success:false, message:"Some Error Occured"});
    }
});
app.get('/myGroupChats', verifyJWT, async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const arr = await Chat.find({
            members: userId,
            groupchat: true
        });
        const groupChats = [];
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const obj = {
                p_pic : "https://th.bing.com/th/id/OIP.y8tWWY6Vh7BX50XtbsIcnwHaFe?rs=1&pid=ImgDetMain",
                _id : element._id,
                name : element.name
            }
            groupChats.push(obj);
        }
        res.status(200).json(groupChats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/GroupMembers', verifyJWT, async (req, res) => {
    try {
        // console.log('-----');
        const gid = req.body.id;
        // console.log(gid);
        const group = await Chat.findById(gid);
        const members = group.members;
        const arr = [];
        for (let index = 0; index < members.length; index++) {
            const element = members[index];
            const user = await User.findById(element);
            let r = false;
            // console.log(group.creator+" "+user._id);
            if(group.creator.toHexString()==user._id.toHexString()){
                r=true;
                const obj = {
                    Member:{
                        id:element,
                        avatar: user.avatar,
                        name: user.name,
                        creator : r
                    },
                    _id:index
                }
                arr.unshift(obj);
                continue;
            }
            const obj = {
                Member:{
                    id:element,
                    avatar: user.avatar,
                    name: user.name,
                    creator : r
                },
                _id:index
            }
            arr.push(obj);
        }
        res.status(200).json(arr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/GroupAdmin', verifyJWT, async (req, res) => {
    try {
        // console.log('-----');
        const gid = req.body.id;
        // console.log(gid);
        const group = await Chat.findById(gid);
        console.log(group.creator);
        console.log(req.user._id);
        let arr = false;
        if(group.creator.toHexString()==req.user._id.toHexString()) arr = true;
        console.log(arr);
        res.status(200).json({arr});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/GroupName', verifyJWT, async (req, res) => {
    try {
        // console.log('-----');
        const gid = req.body.id;
        // console.log(gid);
        const group = await Chat.findById(gid);
        res.status(200).json({name:group.name});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.put('/GroupChange', verifyJWT, async (req, res) => {
    try {
        // console.log('-----');
        const gid = req.body.id;
        const name = req.body.name;

        // console.log(gid);
        const group = await Chat.findById(gid);
        group.name = name;
        group.save();
        res.status(200).json({name});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default app;
