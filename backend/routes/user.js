import express from 'express';import { login,signup } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { User } from '../models/user.model.js';
import { upload } from '../middlewares/multur.middleware.js';
const app = express.Router();
app.use(express.json());
app.post('/login',login);
app.post('/signup',upload.single('avatar'),signup);
app.get('/getUserDetails',verifyJWT,async(req,res)=>{
    const user =await User.findById(req.user._id);
    res.status(200).json({name:user.name,username:user.username,avatar:user.avatar});
});
app.put('/getUsers', async (req, res) => {
    const { name, username } = req.body;
    if (!name && !username) {
        res.status(400).json({ status: false, content: "Please enter a value" });
        return;
    }
    
    
    const users = await User.find({
        $or: [
            { username: username },
            { name: { $regex: new RegExp('^' + name + '$', "i") } } 
        ]
    }).select("-password");
    
    res.status(200).json({ status: true, results: users });
});


export default app;