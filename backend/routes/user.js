import express from 'express';import { login,signup } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multur.middleware.js';

const app = express.Router();
app.post('/login',login);
app.post('/signup',upload.single('avatar'),signup);
export default app;