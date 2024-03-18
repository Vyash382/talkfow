import express from 'express';import { signup,login,getUserDetails } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multur.middleware.js';

const app = express.Router();
app.use(express.json());
app.post('/login',login);
app.post('/signup',upload.single('avatar'),signup);
app.get('/getUserDetails',getUserDetails);
export default app;