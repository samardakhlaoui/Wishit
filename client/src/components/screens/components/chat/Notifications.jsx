import React, { useContext, useState } from 'react'
import './userChat.scss'
import { NotificationsOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { ChatContext } from '../../context/ChatContext'
import { unreadNotificationsFunc } from '../../../../utils/unreadNotifications'
import moment from 'moment'

export default function Notifications({setRecipientChat}) {

    const [isOpen, setIsOpen]= useState(false)
    const user = useSelector((state)=> state.userReducer);
    const {notifications , userChats, allUsers,markAllNotificationsAsRead,markNotificationsAsRead} = useContext(ChatContext);

    const unreadNotifications = unreadNotificationsFunc(notifications);
    const modifiedNotifications = notifications.map((n)=>{
      const sender = allUsers.find(user => user._id === n.senderId)

      return {
        ...n,
        senderName: sender?.fullName
      }
    })

    console.log("un", unreadNotifications)
    console.log("mn",modifiedNotifications)

  return (
    <div className="myChat">
    <div className='notifications'>
      <div className="notifications-icon" onClick={()=> setIsOpen(!isOpen)}>
      <NotificationsOutlined />
      {unreadNotifications?.length === 0 ? null :(
        <span className='notification-count'>
          <span>{unreadNotifications?.length}</span>
        </span>
      )}
      </div>
      {isOpen ? <div className="notifications-box">
        <div className="notifications-header">
            <h3>Notifications</h3>
            <div className="mark-as-read" onClick={()=> markAllNotificationsAsRead(notifications)}>
                mark as all read
            </div>
        </div>
        {modifiedNotifications?.length === 0 ? <span className='notification'>No notification yet...</span>:
        null}
        {modifiedNotifications && modifiedNotifications.map((n,index)=>{
          return (
          <div key={index} className={
            n.isRead ? 'notification' : 'notification not-read'}
            onClick={()=> {
              markNotificationsAsRead(n,userChats,user,notifications,setRecipientChat)
              setIsOpen(false);}
              
            }
            >
            <span>{`${n.senderName} sent you a message`}</span>
            <span className='notification-time'>{moment(n.date).calendar()}</span>
          </div>
        )
        })}
      </div> : null}
      
    </div>
    </div>
  )
}
