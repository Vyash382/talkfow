import express from "express";
import mongoose from "mongoose";
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";
import { createServer } from 'http'; 
const app = express();
const server = createServer(app);
const io = new Server(server,{});
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
})
io.on("connection", (socket)=>{
  console.log("a user connected", socket.id);
  socket.on("disconnect",()=>{
    console.log('Disconnected');
  });
  socket.on("NEW_MESSAGE",(data)=>{
    console.log("New Message",data);
  })
})
server.listen(port,()=>{
  console.log('Server listening on '+port);
})
