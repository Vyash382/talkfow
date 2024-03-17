import {Schema,Types,model} from 'mongoose'
const request = new Schema({
    status:{
        type:String,
        default:"pending",
        enum:["pending","accepted","rejected"]
    },
    sender:{
        type:Types.ObjectId,
        ref:"User"
    },
    receiver:{
        types:Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});
export const Request = model("Request",request);