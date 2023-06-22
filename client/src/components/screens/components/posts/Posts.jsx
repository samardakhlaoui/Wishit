import "./posts.scss"
import Post from "../post/Post"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePosts, getProfilePosts } from "../../../../actions/post.actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
export default function Posts({userId}) {

  const user = useSelector((state)=> state.userReducer);
  const posts = useSelector((state)=> state.postReducer);
  const dispatch= useDispatch()
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname === '/') {
      dispatch(getHomePosts(user._id))
    } else {
      dispatch(getProfilePosts(userId))
    }
  }, [location.pathname, userId, user._id,dispatch]);
  return (
    
    <div className="posts">
    {Array.isArray(posts) && posts.map(post=>(
      <Post post={post} key={post._id} />
    ))}
  </div>
  )
}
