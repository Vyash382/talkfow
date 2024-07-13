import express from "express";
import mongoose from "mongoose";
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";
import { createServer } from 'http'; 
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';
import { getSockets } from "./utility/utils.js";
import { Message } from "./models/message.model.js";
import { socketAuthenticator } from "./middlewares/auth.middleware.js";
import { User } from "./models/user.model.js";
dotenv.config();
const userSocketIds = new Map();
const app = express();
const server = createServer(app);
const io = new Server(server,{ cors : {
  origin:   [ 'http://localhost:5173', 'http://localhost:5174'], 
  credentials: true
}});
app.use(cookieParser());
app.use(cors({
  origin:   [ 'http://localhost:5173', 'http://localhost:5174'], 
  credentials: true
}));
const MONGO_URI = 'mongodb://localhost:27017/talkfow';
const connectToMongo = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
connectToMongo();
const port = 3000;

  app.use('/user',userRoute);
  app.use('/chat',chatRoute);

app.get('/',(req,res)=>{
    res.json({"message":"Hello"});
});

io.use((socket, next) => {
  // console.log(socket);
  cookieParser()(
    socket.request,
    socket.request.res,
    async (err) => await socketAuthenticator(err, socket, next)
  );
});
app.set("io", io);
io.on("connection", (socket)=>{
  const user = socket.user;
  // console.log('-----');
  
  // console.log(user);
  // console.log('-----');
  
  userSocketIds.set(user._id.toString(), socket.id);
  // console.log(userSocketIds);
  
  console.log("a user connected", socket.id);
  socket.on("disconnect",()=>{
    console.log('Disconnected');
    userSocketIds.delete(user._id.toString());
  });
  socket.on("NEW_MESSAGE", async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuidv4(),
      sender: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    }
    
    // console.log(message);
    const membersSockets = getSockets(members);
    membersSockets.push(userSocketIds.get(user._id));
    io.to(membersSockets).emit('NEW_MESSAGE',{
      chatId,
      message: messageForRealTime
    });
    io.to(membersSockets).emit('NEW_MESSAGE',{ chatId });
    await Message.create(messageForDB);
  });
  
})
server.listen(port,()=>{
  console.log(process.env.PORT);
  console.log('Server listening on '+port);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
export {userSocketIds};
