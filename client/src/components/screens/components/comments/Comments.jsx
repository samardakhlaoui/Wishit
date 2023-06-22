import { useDispatch, useSelector } from 'react-redux';
import './comments.scss'
import { useState } from 'react';
import { isEmpty, timestampParser } from '../Routes/Utils';
import { Link } from "react-router-dom";
import { addComment, getPosts } from '../../../../actions/post.actions';
import EditDeleteComment from './EditDeleteComment';

export default function Comments({ post,showWrite }) {
     //Temporary
     const [text,setText] = useState('');
     const user = useSelector((state)=> state.userReducer);
     const users = useSelector((state)=> state.usersReducer);
     
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const dispatch= useDispatch();
     const handleComment= (e) =>{
      e.preventDefault();
      if(text){
        dispatch(addComment(post._id, user._id,text,user.fullName))
        .then(()=> dispatch(getPosts()))
        .then(()=> setText(''));
      }
     };
  return (
    <div className="comments">
  {showWrite && (
  <div className="write">
    <img src={user.profilePicture} alt="" />
    <form
      action=""
      style={{ display: "flex", width: "100%", gap: "10px" }}
      onSubmit={handleComment}
    >
      <input
        style={{ width: "90%" }}
        type="text"
        name="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="write a comment"
      />
      <button type="submit">Send</button>
    </form>
  </div>
)}


      {
        post.comments.map((comment) =>{
          return(
            <div className="comment" key={comment._id}>
                <img src={!isEmpty(users[0])&& users.map((commenter)=>{if (commenter._id === comment.commenterId) return commenter.profilePicture ? "../" + commenter.profilePicture : PF + "profile/hacker.png"}).join("")} alt="commenter-pic" />
          <div className="info">
            <div className="userr" style={{display:'flex'}}>
            <Link to={`/profile/${comment.commenterId}`} style={{ textDecoration: "none", color: "inherit" }}>
              <span style={{paddingRight:'5px'}}>{comment.commenterName} </span>
            </Link>
            <span className="date">{timestampParser(comment.timestamp)}</span>
            </div>
            <p>{comment.text}</p>
          </div>
          {comment.commenterId === user._id &&(
            <EditDeleteComment className="dots" comment={comment} postId={post._id}/>
          )}
            </div>
        )})
    }

    </div>
  )
}
