import { uploadOnCloudinary } from "../uploads/cloudinary.js";
const login = (req,res)=>{
     
};
const signup = async(req,res)=>{
    console.log(req.file?.path);
    const resp = await uploadOnCloudinary(req.file?.path);
    console.log(resp);
    res.status(201).send(resp);
};
export {login,signup};