import express from "express";
import mongoose from "mongoose";
import userRoute from './routes/user.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
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
app.listen(3000,()=>{
    console.log('Server listening on 3000');
})
app.use('/user',userRoute);

app.get('/',(req,res)=>{
    res.json({"message":"Hello"});
})