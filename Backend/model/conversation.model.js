import mongoose from "mongoose";
import User from "../model/user.model.js";
import Message from "./message.model.js";
const conversationSchema = new mongoose.Schema({
    members :[
       { 
        
        type:mongoose.Schema.Types.ObjectId,
        ref : User 

       }
    ],
    messages : [
        {
           
        type:mongoose.Schema.Types.ObjectId,
        ref : Message,
        default:[]
 
        }
    ]
},{timestamp:true});

const Conversation = mongoose.model("conversation ", conversationSchema);
export default Conversation;