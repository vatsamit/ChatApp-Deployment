import React, {  useEffect } from 'react'
import useConversation from '../zustand/useConversation.js'
import {useSocketContext} from "./SocketContext";
import sound from '../assets/notification.mp3';

const useGetSocketMessage = () => {
    const {socket} = useSocketContext()
    const {messages ,setMessage} =useConversation()

    useEffect(()=>{
       socket.on("newMessage" , (newMessage)=>{
        const notification = new Audio(sound)
        notification.play();
        setMessage([...messages , newMessage]);
       }) ;
       return ()=>{
        socket.off("newMesage")
       };
    },[socket , messages , setMessage]);
}
export default useGetSocketMessage ;
