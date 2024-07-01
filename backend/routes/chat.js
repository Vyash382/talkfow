import express from 'express';
import { Chat } from '../models/chat.model.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { emitEvent } from '../utility/utils.js';
import { User } from '../models/user.model.js';
import { Message } from '../models/message.model.js';
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
        res.status(200).json({ success: true, my_chats });
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
app.get('/myMessages:id',verifyJWT,async(req,res)=>{
    const chatId = req.params.id;
    const { page = 1 } = req.query;
  
    const resultPerPage = 20;
    const skip = (page - 1) * resultPerPage;
  
    const chat = await Chat.findById(chatId);
  
    if (!chat) return next(new ErrorHandler("Chat not found", 404));
  
    if (!chat.members.includes(req.user.toString()))
      return next(
        new ErrorHandler("You are not allowed to access this chat", 403)
      );
  
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
  
    return res.status(200).json({
      success: true,
      messages: messages.reverse(),
      totalPages,
    });
})

export default app;
