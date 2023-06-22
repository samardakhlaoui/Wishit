import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../../context/ChatContext';
import { Container, Stack } from '@mui/material';
import './userChat.scss'
import { baseUrl, getRequest } from '../../../../utils/services';
import moment from 'moment';
import InputEmoji from "react-input-emoji";
import {Send } from '@mui/icons-material';


export default function ChatBox({recipientChat , user}) {
    const {messages , isMessagesLoading, sendTextMessage} = useContext(ChatContext);
    const [recipientU,setRecipientU] =useState({})
    const [textMessage,setTextMessage] =useState("")
    const scroll = useRef();
    
    useEffect(()=>{
      scroll.current?.scrollIntoView({behavior : "smooth"})
    },[messages])

    const getRecipient= async()=>{
      let member1 = recipientChat.members[0] === user._id ? recipientChat.members[1] : recipientChat.members[0];
      const response = await getRequest(`${baseUrl}/users/${member1}`);
      setRecipientU(response)
      
      }
      
    useEffect(()=>{
      getRecipient();
    },[recipientChat])

   
     


      
     if(Object.keys(recipientU).length === 0)
     {return(
        <p style={{textAlign:"center", width:"100%"}}>
            No conversation selected yet...
        </p>
    )}
    
    if(isMessagesLoading){
        return(
            <p style={{textAlign:"center", width:"100%"}}>
                Loading...
            </p>)
    }
    
      return (
        <Container className='myChat'>
        <Stack gap={4} className='chat-box'>
          <div className='chat-header'>
            <strong>{recipientU.fullName}</strong>
          </div>
          <div className="messages-box2" >
          {messages && messages.map((message, index) => (
          <Stack className='messages' sx={{alignItems: message?.senderId === user?._id ? 'flex-end' : 'flex-start', flexDirection: 'column'}}
          >
            
    <Stack 
      key={index}
      className={`${message?.senderId === user?._id ? "message2"
                : "message1 self"}`}
                ref={scroll}
    
    >
      <span>{message.text}</span>
      <span className='message-footer'>{moment(message.createdAt).calendar()}</span>
    </Stack>
 
</Stack>

 ))}
 </div>
 <Stack direction={"row"} gap={3} className='chat-input'>
      <InputEmoji 
        value ={textMessage}
        onChange={setTextMessage}
        borderColor="rgb(72,112,223,0.2)"/>
        <button className='send-btn' onClick={()=> sendTextMessage(textMessage,user,recipientChat._id , setTextMessage )}>
          <Send />
        </button>
  
 </Stack>
  </Stack>
  </Container>
      
  )
}