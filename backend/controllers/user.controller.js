import { uploadOnCloudinary } from "../uploads/cloudinary.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const generateAccessToken = async function(id){
    return await jwt.sign(
        {
            _id:id
        },
        "YUAFGBbIUBHafbaugBIUGUBghuSGgbuibgubguyba JGHE78453BHA^&TgvAytT78GABYUUYETGYWTBUWYF",
        {
            expiresIn: "1d"
        }
    )
}
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
    if( !email || !password ){
        res.status(400).json({status:false,content:"Please enter all the credentials"});
        return;
    }
    const user = await User.findOne({username:email});
    if(!user){
        res.status(400).json({status:false,content:"User does not exists"});
        return;
    }
    const actualpassword =  user.password;
    const flag = await bcrypt.compare(password,actualpassword);
    if(!flag){
        res.status(400).json({status:false,content:"Please enter the correct credentials"});
        return;
    } 
    const loggedInUser = await User.findById(user._id).select("-password");
    const accesstoken = await generateAccessToken(user._id);
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(400).cookie("accessToken",accesstoken,options).json({status:true,accesstoken,loggedInUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:false,content:"Internal server error"});
    }
    
};
const signup = async(req,res)=>{
    try {
        const {named,email,password} = req.body;
        console.log(named,email,password,req.file);
    if(!named || !email || !password || !req.file){
        res.status(400).json({status:false,content:"Please enter all the credentials"});
        return;
    }
    const ifue = await User.findOne({username:email});
    console.log(ifue);
    if(ifue){
        res.status(400).json({status:false,content:"User already exists"});
        return;
    }

    const password2 = await bcrypt.hash(password,10); 
    const localpath = req.file.path;
    
    const cres = await uploadOnCloudinary(localpath);
    const user = new User({name:named,username:email,password:password2,avatar:cres.url});
    user.save();
    res.status(201).json({status:true,user:user});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:false,content:"Internal server error"});
    }
    
};
const getUserDetails=()=>{
    
}
export {login,signup,getUserDetails};