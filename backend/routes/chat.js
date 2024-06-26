import express from 'express';
import { Chat } from '../models/chat.model.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { emitEvent } from '../utility/utils.js';
const app = express.Router();
app.use(express.json());
app.post('/newGroupChat',verifyJWT,async(req,res)=>{
    const {name,members} = req.body;
    if(members.length < 2){
        res.status(500).json({success: false, message: "Add more peoples for group chat"});
    }
    const allMembers = [...members,req.user._id];
    await Chat.create({
        name,
        groupchat: true,
        creator: req.user,
        members: allMembers
    });
    emitEvent(req,'ALERT',`Welcome to ${name} Group`,allMembers);
    emitEvent(req,'REFETCH_CHATS','You have been added in a group',members);
    res.status(201).json({success:true,name,members:allMembers})
})
export default app;