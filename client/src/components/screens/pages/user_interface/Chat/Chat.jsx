import { AddOutlined, Message, Group, Home, Person, Redeem, Settings, SearchOutlined } from "@mui/icons-material";
import "./chat.scss";
import { Link } from "react-router-dom";
import { Stack,Container } from "@mui/material";
import { useContext, useState } from "react";
import { ChatContext } from "../../../context/ChatContext";
import UserChat from "../../../components/chat/UserChat";
import { useSelector } from "react-redux";
import PotentialChat from "../../../components/chat/PotentialChat";
import ChatBox from "../../../components/chat/ChatBox";
import Notifications from "../../../components/chat/Notifications";
import IconSidebar from "../../../components/iconSideBar/IconSideBar";





export default function Chat() {

  const user = useSelector((state)=> state.userReducer);
  const {userChats,isUserChatsLoading,updateCurrentChat,currentChat} = useContext(ChatContext);
  const [recipientU, setRecipientU] = useState({});
  const [recipientChat,setRecipientChat] = useState({})
 
  return (
<div style={{display:"flex"}}>
    <div className="sidebar-chat">
    <IconSidebar/>
  </div>
    <div className="content">
      <div style={{justifyContent :' space-around',    display: 'inline-flex', alignItems:'center'}}>
      <PotentialChat />
      </div>
  
    <Stack style={{position: "fixed" ,width: "85%"}}
      direction="row" gap={3}>

      <Stack  className="messages-box">

      <h3>Messages</h3>
        {isUserChatsLoading && <p>Loading chats...</p>}
        
        {userChats?.map((chat,index)=>{
          return (
            <div key={index} onClick={()=>{updateCurrentChat(chat); setRecipientChat(chat)}}>
              <UserChat chat={chat} user={user} setRecipientU={setRecipientU}/>
            </div>
          )
        })}
      </Stack>
      <ChatBox recipientChat={recipientChat} user ={user}/>

    </Stack>

 
</div>
</div> )
}

