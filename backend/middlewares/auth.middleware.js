import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
const verifyJWT=async(req,res,next)=>{
    // console.log(req);
    const {accessToken} = req.cookies;
        if(!accessToken){
        res.status(400).json({status:false,content:"User not logged in"});
        return;
    }
    const decoded = await jwt.verify(accessToken,"YUAFGBbIUBHafbaugBIUGUBghuSGgbuibgubguyba JGHE78453BHA^&TgvAytT78GABYUUYETGYWTBUWYF");
     const user = await User.findById(decoded._id).select("-password");
     if(!user){
        res.status(400).json({status:false,content:"Invalid access token"});
        return;
     }
     req.user =user;
     console.log(user);
     next();
}
export {verifyJWT};