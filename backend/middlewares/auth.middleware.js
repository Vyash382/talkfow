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
    //  console.log(user);
     next();
}
;
const socketAuthenticator = async (err, socket, next) => {
    try {
      if (err) return next(err);
        console.log(socket.req);
        
      const authToken = socket.request.cookies["accessToken"];
  
      if (!authToken) {
        console.log("Authentication token not found");
        return next(new Error("Authentication error"));
      }
  
      const decodedData = jwt.verify(authToken,"YUAFGBbIUBHafbaugBIUGUBghuSGgbuibgubguyba JGHE78453BHA^&TgvAytT78GABYUUYETGYWTBUWYF" );
  
      const user = await User.findById(decodedData._id);
  
      if (!user) {
        console.log("User not found");
        return next(new Error("Authentication error"));
      }
  
      socket.user = user;
  
      return next();
    } catch (error) {
      console.log("Authentication error", error);
      return next(new Error("Authentication error"));
    }
  };
export {verifyJWT,socketAuthenticator};