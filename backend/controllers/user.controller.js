import { uploadOnCloudinary } from "../uploads/cloudinary.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
const generateAccessToken = async function(id) {
    return await jwt.sign(
        {
            _id: id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ status: false, content: "Please enter all the credentials" });
            return;
        }
        const user = await User.findOne({ username: email }).select("+password");
        if (!user) {
            res.status(400).json({ status: false, content: "User does not exist" });
            return;
        }
        const flag = await user.comparePassword(password);
        if (flag) {
            res.status(400).json({ status: false, content: "Please enter the correct credentials" });
            return;
        }
        const loggedInUser = await User.findById(user._id).select("-password");
        const accessToken = await generateAccessToken(user._id);
        const options = {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: true,
            sameSite: 'None'
        };
        res.status(200).cookie("accessToken", accessToken, options).json({ status: true, accessToken, loggedInUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, content: "Internal server error" });
    }
};

const signup = async(req, res) => {
    try {
        const { named, email, password } = req.body;
        if (!named || !email || !password || !req.file) {
            res.status(400).json({ status: false, content: "Please enter all the credentials" });
            return;
        }
        const ifue = await User.findOne({ username: email });
        if (ifue) {
            res.status(400).json({ status: false, content: "User already exists" });
            return;
        }
        const password2 = await bcrypt.hash(password, 10);
        const localpath = req.file.path;
        console.log('--------------------');
        const cres = await uploadOnCloudinary(localpath);
        const user = new User({ name: named.toUpperCase(), username: email, password: password2, avatar: cres.url });
        await user.save();
        res.status(201).json({ status: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, content: "Internal server error" });
    }
};

const getUserDetails = () => {};

export { login, signup, getUserDetails };