import express from 'express';import { login,signup } from '../controllers/user.controller.js';

const app = express.Router();
app.post('/login',login);
app.post('/signup',signup);
export default app;