import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        res.status(400).json({ status: false, content: "User not logged in" });
        return;
    }
    try {
        const decoded = await jwt.verify(accessToken, "YUAFGBbIUBHafbaugBIUGUBghuSGgbuibgubguyba JGHE78453BHA^&TgvAytT78GABYUUYETGYWTBUWYF");
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            res.status(400).json({ status: false, content: "Invalid access token" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ status: false, content: "Token expired" });
        } else {
            res.status(400).json({ status: false, content: "Invalid access token" });
        }
    }
};

const socketAuthenticator = async (err, socket, next) => {
    try {
        if (err) return next(err);

        const authToken = socket.request.cookies["accessToken"];
        if (!authToken) {
            console.log("Authentication token not found");
            return next(new Error("Authentication error"));
        }

        jwt.verify(authToken, "YUAFGBbIUBHafbaugBIUGUBghuSGgbuibgubguyba JGHE78453BHA^&TgvAytT78GABYUUYETGYWTBUWYF", async (error, decodedData) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    console.log("Token expired");
                } else {
                    console.log("Authentication error", error);
                }
                return next(new Error("Authentication error"));
            }

            const user = await User.findById(decodedData._id);
            if (!user) {
                console.log("User not found");
                return next(new Error("Authentication error"));
            }

            socket.user = user;
            next();
        });
    } catch (error) {
        console.log("Authentication error", error);
        next(new Error("Authentication error"));
    }
};

export { verifyJWT, socketAuthenticator };
