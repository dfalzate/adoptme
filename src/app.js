import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import { engine } from "express-handlebars";

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';


dotenv.config();

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
