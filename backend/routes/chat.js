import express from 'express';
import { Chat } from '../models/chat.model.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { emitEvent } from '../utility/utils.js';
import { User } from '../models/user.model.js';
import { Message } from '../models/message.model.js';
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
        const id = req.user._id;
        const my_chats = await Chat.find({ members: id });
        const arr =[];
        for (let index = 0; index < my_chats.length; index++) {
            const element = my_chats[index];
            // console.log(element);
            if(element.groupchat=='true'){
                const obj1 = {
                    name : element.name,
                    avatar : 'https://th.bing.com/th/id/OIP.kg6yJds7NHwm0Zz1AXOyBgHaEK?w=310&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7',
                    id: element._id
                }
                arr.push(obj1);
            }
            else{
                
                if(element.members[0]==id){
                    console.log(id,element.members[0]);
                    if(element.members[0]!=id){
                    const user = await User.findById(element.members[0]);
                    const obj1 = {
                        name : user.name,
                        avatar : user.avatar,
                        id: element._id
                    }
                    arr.push(obj1);
                }
                }
                else{
                    console.log(id,element.members[1]);
                    if(element.members[1]!=id){
                    const user = await User.findById(element.members[1]);
                    const obj1 = {
                        name : user.name,
                        avatar : user.avatar,
                        id: element._id
                    }
                    arr.push(obj1);
                }
                }
            }
            
        }
        res.status(200).json({ success: true, arr });
    } catch (error) {
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

app.delete('/leave/:id', verifyJWT, async (req, res) => {
    try {
        const chatId = req.params.id;
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
        emitEvent(req, 'ALERT', chat.members, `${req.user.name} has left`);
        emitEvent(req, 'REFRESH_CHAT', chat.members);
        return res.status(200).json({ success: true, chat });
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

app.put('/chat/:id', verifyJWT, async (req, res) => {
    try {
        const { name } = req.body;
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        chat.name = name;
        await chat.save();
        res.status(200).json({ success: true, chat });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
});

app.delete('/chat/:id', verifyJWT, async (req, res) => {
    try {
        const chatId = req.params.id;
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
// app.get('/misc/:chatId',verifyJWT,async(req,res)=>{
//     const user = req.user._id.toString();
//     const chatId = req.params.
// })

export default app;
