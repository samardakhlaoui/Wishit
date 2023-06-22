import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import './userChat.scss';
import { useSelector, } from "react-redux";
export default function PotentialChat() {
  const {potentialChats, createChat,onlineUsers} = useContext(ChatContext);
  const user = useSelector((state)=> state.userReducer);
  



    return (
      <div className="myChat">
    <div className="all-users">
      {potentialChats && 
      potentialChats.map((u,index)=>{
        return (
          <div className="single-user" key={index} onClick={()=>createChat(user._id, u._id) }>
            {u.fullName}
            <span className={
              onlineUsers?.some((user)=> user?.userId === u?._id )?
              "user-online2" : ""}></span>
          </div>
        );
      })}
    </div>
    </div>
  )
}
