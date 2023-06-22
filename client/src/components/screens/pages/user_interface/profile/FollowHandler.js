import React, { useEffect, useState } from "react";
import "./userProf.css";
import { isEmpty } from "../../../components/Routes/Utils";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../../../../actions/user.actions";
const FollowHandler = ({ idToFollow}) =>{
const user = useSelector((state)=> state.userReducer);
    const [isFollowed,setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () =>{
        dispatch(followUser(user._id, idToFollow));
        setIsFollowed(true);
    }
    const handleUnFollow = () =>{
         dispatch(unfollowUser(user._id, idToFollow));
        setIsFollowed(false);
    }
    useEffect(()=>{
        if (!isEmpty(user.following)){
            const isFollowing = user.following.some((follower) => follower._id === idToFollow);
            setIsFollowed(isFollowing);
        }
    },[user.following,idToFollow] )
    return(
        <>
        {isFollowed && !isEmpty(user) &&(
            <span onClick={handleUnFollow}> 
                <button className="following-btn  color-6">following</button>
            </span>
        )}
        {isFollowed===false && !isEmpty(user) &&(
            <span onClick={handleFollow}>
                <button className="follow-btn  color-6">Follow</button>
            </span>
        )}
        </>
    );
};
export default FollowHandler;