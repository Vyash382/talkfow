import { Schema,model } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required:true,
        unique :true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
       type:String,
       required:true
    }
},
{
    timestamps:true
});
export const User = model("User",schema);
schema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})
schema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
} ;
schema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id:this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
