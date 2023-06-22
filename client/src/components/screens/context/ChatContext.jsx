import{io} from "socket.io-client";
import { useState,useEffect, createContext, useCallback } from "react";
import { baseUrl, postRequest , getRequest } from "../../../utils/services";
import { useSelector } from "react-redux";
export const ChatContext = createContext();





export const ChatContextProvider = ({children}) =>
{   
    const user = useSelector((state)=> state.userReducer);
    const [userChats, setUserChats ] =useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading ] =useState(false);
    const [userChatsError, setUserChatsError ] =useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat]= useState(null);
    const [messages, setMessages ] =useState(null);
    const [isMessagesLoading, setIsMessagesLoading ] =useState(false);
    const [messagesError, setMessagesError ] =useState(null);
    const [sendTextMessageError, setSendTextMessageError ] =useState(null);
    const [newMessage, setNewMessage ] =useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers,SetOnlineUsers] = useState([])
    const [notifications, setNotifications]= useState([]);
    const [allUsers, setAllUsers]= useState([]);


    console.log("Notifications",notifications)
    //initial socket

    useEffect(()=>{
      const newSocket = io("http://localhost:8080");
      setSocket(newSocket);

      return ()=>{
        newSocket.disconnect();
      }

    },[user])

    // aad online users
     useEffect(()=>{
      if(socket === null) return
      socket.emit("addNewUser", user?._id)
      socket.on("getOnlineUsers",(res)=>{
          SetOnlineUsers(res);
      });
      return ()=>{
        socket.off("getOnlineUsers")
      };
     },[socket])
     
     //send message 

     useEffect(()=>{
      if(socket === null) return;
      const recipientId = currentChat?.members.find((id) => id !== user?._id);

      socket.emit("sendMessage",{...newMessage,recipientId})
      
     },[newMessage])

     

     //receive message and notification
     useEffect(()=>{
      if(socket === null) return;
      
      socket.on("getMessage",(res)=>{
      if(currentChat?._id !== res.chatId) return;

      setMessages((prev)=>[...prev,res])
      })

      socket.on("getNotification",(res) =>{
        const isChatOpen = currentChat?.members.some(id => id === res.senderId)
        
        if(isChatOpen){
          setNotifications(prev=>[{...res, isRead : true}, ...prev])
        }
        else {
          setNotifications(prev =>[res, ...prev])
        }
      })

      return ()=>{
        socket.off("getMessage");
        socket.off("getNotification");

      }
     },[socket,currentChat])


    useEffect(()=>{
      const getUsers = async()=>{
       
          const response = await getRequest(`${baseUrl}/users`);

          if(response.error){
            return console.log("Error fetching users", response);
          }
        const pChats = response.filter((u) => {
          let isChatCreated = false;

          if(user?._id === u._id) return false ;

          if(userChats) {
            isChatCreated = userChats?.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
        setAllUsers(response);
      }
      getUsers();
    },[userChats])

    

    


useEffect(() => {
  const getUserChats = async () => {
    if (user?._id) {
      setIsUserChatsLoading(true);
      setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);

        if (response.error) {
          setUserChatsError(response.error);
        } 
          setUserChats(response);

    }
  };
  getUserChats();
}, [user,notifications]);

useEffect(() => {
  const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

        const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
        setIsMessagesLoading(false);

        if (response.error) {
          setMessagesError(response.error);
        } 
        setMessages(response);
    
  };
  getMessages();
}, [currentChat]);


const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage)=>{
  if(!textMessage) return console.log("Write something !")
  const response = await postRequest(`${baseUrl}/messages`,
   JSON.stringify({
    chatId :currentChatId , 
    senderId : sender._id,
    text: textMessage,
  })
  );
  if (response.error) {
    setSendTextMessageError(response.error);
  } 

  setNewMessage(response)
  setMessages((prev)=>[...prev, response]);
  setTextMessage("");

},[])

/*const sendTextMessage = async (textMessage, sender, currentChatId, setTextMessage) => {
  if (!textMessage && !audioMessage) return;

  const formData = new FormData();
  formData.append('chatId', currentChatId);
  formData.append('senderId', sender._id);
  formData.append('text', textMessage);
  if (audioMessage) {
      formData.append('isRecorded', true);
      formData.append('audioMessage', audioMessage.blob, audioMessage.name);
  }

  try {
      await postRequest(`${baseUrl}/messages`, formData);
      setTextMessage('');
      setAudioMessage(null);
  } catch (error) {
      console.error(error);
  }
};


*/



const updateCurrentChat = useCallback((chat) => {
 
    setCurrentChat(chat);
  
}, []);


  const createChat = useCallback(async(firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`,
     JSON.stringify({
      firstId, 
      secondId
    })
    );
    if(response.error){
      return console.log("error creating chat",response)
    }
    setUserChats((prev)=>[...prev, response]);
  },[])


    const markAllNotificationsAsRead = useCallback((notifications)=>{
      const mNotifications = notifications.map((n) => {
        return {...n,isRead: true}});

        setNotifications((mNotifications));
    },[])

    const markNotificationsAsRead = useCallback(
      (n, userChats, user, notifications,setRecipientChat)=>{
        //find chat to open
        const desiredChat = userChats.find((chat)=>{
          const chatMembers= [user._id, n.senderId];
          const isDesiredChat = chat?.members.every((member)=>{
            return chatMembers.includes(member);
          });
          return isDesiredChat;
        });
    
        console.log("desiredChat",desiredChat);
    
        // set the current chat and recipient chat
        updateCurrentChat(desiredChat);
        setRecipientChat(desiredChat);
        
        // mark notification as read
        const mNotifications = notifications.map((el) => {
          if (n.senderId === el.senderId){
            return {...n, isRead:true};
          } else {
            return el;
          }
        });
    
        setNotifications(mNotifications);
      },
      []
    );
    const markThisUserNotificationsAsRead = useCallback((thisUserNotifications, notifications)=>{
      const mNotifications = notifications.map((el) => {
        let notification;

        thisUserNotifications.forEach(n => {
          if (n.senderId === el.senderId){ 
              notification = {...n , isRead:true};
           }else {
            notification = el;
           }
        })
        return notification;
       })
       setNotifications(mNotifications)
    },[])





    return <ChatContext.Provider value = {{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationsAsRead,
        markThisUserNotificationsAsRead
    }}>{children}
    </ChatContext.Provider>

}