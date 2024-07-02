import { userSocketIds } from "../app.js";

const emitEvent= (req,event,users,data)=>{
    console.log("illl");
}
const getSockets = (users)=>{
    const sockets = users.map((user)=> userSocketIds.get(user.toString()));
    return sockets;
}
export {emitEvent ,getSockets};
