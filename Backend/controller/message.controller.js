import { io } from '../Socket.io/server.js';
import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';
import { getReceiverSocketId } from '../Socket.io/server.js';
export const sendMessage = async(req,res)=>{
  
   try {
    const {message}= req.body;
    const {id:receiverId} = req.params ;
    const senderId = req.user._id ; //current logged in user
     let conversation = await Conversation.findOne({
        members : {$all:[senderId , receiverId]},
     });
     if(!conversation){
        conversation = await Conversation.create({
            members : [senderId , receiverId],
        });
     }
    const newMessage  = new Message ({
        senderId,
        receiverId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
   await Promise.all([conversation.save() ,newMessage.save()]) //run parallel;
   const receiverSocketId = getReceiverSocketId(receiverId)
   if(receiverSocketId){
    io.to(receiverSocketId).emit("newMessage" ,newMessage)
   }
   res.status(201).json( newMessage)  
 
   } catch (error) {
    console.log("Error in sendMessage" , error);
    res.status(500).json({error:"Internal sever error"});
    
   }
}
export const getMessage = async(req,res)=>{
    try {
        const {id:chatuser} = req.params ;
    const senderId = req.user._id ;

    let conversation = await Conversation.findOne({
        members : {$all:[senderId , chatuser]},
     }).populate("messages")
     if(!conversation){
        return res.status(201).json([]);
     }
     const messages = conversation.messages ;
     return res.status(201).json(messages);

    } catch (error) {
        console.log("Error in getMessage" , error);
        res.status(500).json({error:"Internal sever error"});

    }
}