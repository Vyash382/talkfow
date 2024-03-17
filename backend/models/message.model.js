import {Schema,Types,model} from 'mongoose'
const message = new Schema({
    sender:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    attachments:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }]
},{timestamps:true});
export const Message = model("Message",message);