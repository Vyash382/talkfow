import express from "express";
import mongoose from "mongoose";
import userRoute from './routes/user.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
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
app.listen(port,()=>{
    console.log('Server listening on '+port);
})
app.use('/user',userRoute);

app.get('/',(req,res)=>{
    res.json({"message":"Hello"});
})