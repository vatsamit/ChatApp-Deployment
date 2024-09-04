import express from "express";
import dotenv from "dotenv" ;
import mongoose from 'mongoose';
import cors from 'cors' ;
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./Socket.io/server.js";



dotenv.config();

// Middlewares //
app.use(cors());
app.use(cookieParser());
app.use(express.json());


const PORT = process.env.PORT || 3001
const URI = process.env.MONGODB_URI

try {
    mongoose.connect(URI)
    console.log("Connected to Mongodb")
    
} catch (error) {
    console.log(error)
}

//Routes //
app.use("/api/user" ,userRoute);
app.use("/api/message" ,messageRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})