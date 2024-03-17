import {Schema,Types,model} from 'mongoose'
const chat = new Schema({
    name:{
        type:String,
        required:true
    },
    groupchat:{
        type:String,
        default:false
    },
    creator:{
        type:Types.ObjectId,
        ref:"User"
    },
    members:[{
        type:Types.ObjectId,
        ref:"User"
    }]

},{timestamps:true});
export const Chat = model("Chat",chat);