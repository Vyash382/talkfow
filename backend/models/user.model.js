import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const schema = new Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

schema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

schema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

schema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

export const User = model("User", schema);
