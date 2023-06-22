import React, { useEffect} from 'react'
import { useFetchRecipientUser } from '../../../../hooks/useFetchRecipient';
import { Stack } from '@mui/material'; 
import './userChat.scss';
import { baseUrl, getRequest } from '../../../../utils/services';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { unreadNotificationsFunc } from '../../../../utils/unreadNotifications';
import moment from 'moment';
import { useFetchMessage } from '../../../../hooks/useFetchMessage';

export default function UserChat({chat, user,setRecipientU}) {

  const {recipientUser} = useFetchRecipientUser(chat , user);
  const {onlineUsers, notifications,markThisUserNotificationsAsRead} = useContext(ChatContext);
  const {latestMessage} = useFetchMessage(chat);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?._id );
  const unreadNotifications = unreadNotificationsFunc(notifications)
  const thisUserNotifications = unreadNotifications?.filter(
    n=> n.senderId == recipientUser?._id
  )




    const getRecipient= async()=>{
      
      let member1 = chat.members[0] === user._id ? chat.members[1] : chat.members[0];
      console.log("member1",member1)
    const response = await getRequest(`${baseUrl}/users/${member1}`);
    setRecipientU(response)
    }
  useEffect(()=>{
    getRecipient();
  },[chat])

  const truncateMessage = (text)=>{
    let shortText = text.substring(0,20);

    if(text.length >20){
      shortText = shortText + "...";
    }
    return shortText;
  }

  return (
    <div className="myChat">
    <div className="chat-body">
    <Stack 
    direction="row"
    spacing={3}
    className="user-card align-items-center p-1 justify-content-between"
    onClick = {()=>{
      if(thisUserNotifications?.length !== 0 ){
        markThisUserNotificationsAsRead(
          thisUserNotifications,
          notifications
        )
      }
    }}
  >
    <div className='uuuu' >
      <div>
        <img src= {recipientUser.profilePicture ||  PF+"profile/hacker.png"} alt="" height={"35px"}/>
      </div>
      <div className="text-content">
        <div className="name">{recipientUser.fullName}</div>
        <div className={thisUserNotifications?.length > 0 ? "text not-open" :"text"}>{
          latestMessage?.text &&(
            <span>{truncateMessage(latestMessage?.text)}</span>
          )
        }</div>
      </div>
    </div>
    <div className="uuuu">
     <div className="date-nof">
      <div className={thisUserNotifications?.length > 0 ? "date not-open" :"date"}>
        {moment(latestMessage?.createdAt).calendar()}
      </div>
      <div className={ thisUserNotifications?.length > 0 ? "this-user-notifications": ""}>
        {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : '' }
      </div>
      </div>
      <div className={isOnline ? "user-online2" : ""}></div>
    </div>
  </Stack>
  </div>
  </div>
  )
}