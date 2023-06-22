import React, { useEffect } from 'react';
import "./home.scss"
import PostsDiagram from './PostsDiagram';
import UsersDiagram from './UsersDiagram';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../../../../actions/post.actions';
import { getGiftlists } from '../../../../../actions/giftlist.actions';
const AdminHome = () => {
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(getPosts())
    dispatch(getGiftlists())
  }, []);

  return (
    <div className='flex-container'> 
       <div className="flex-item-users"><UsersDiagram/></div>
        <div className="flex-item-posts"><PostsDiagram/></div>
    </div>
  );
};

export default AdminHome;
