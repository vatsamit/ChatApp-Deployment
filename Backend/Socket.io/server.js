import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods :["GET" , "POST"] ,
        
    },
});
// Realtime message  code goes here
export  const getReceiverSocketId =(receiverId)=>{
    return users[receiverId]
};

const users = {};
//used to listen events on server side
io.on("connection",(socket)=>{
    console.log("A user is connected" , socket.id);
    const userId = socket.handshake.query.userId ;

    if(userId){
        users[userId] = socket.id ;
        console.log("Hello" ,users);
    }
// use to send events to all connected users 
    io.emit("getOnlineUsers" ,Object.keys(users)); 
// used to listen client side events emitted by server side(server & client)
  
socket.on("disconnect" ,()=>{
        console.log("a user is disconnected" ,socket.id);
        delete users[userId];
        io.emit("getOnlineUsers" ,Object.keys(users)); 

    })
})

export{app ,io , server};