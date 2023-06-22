import { useEffect, useState } from "react"
import "./filter.css"
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../../actions/post.actions";
import { isEmpty } from "../Routes/Utils";

export default function Filter({category}) {
    console.log('from filter'+ category)
    const [loadPost, setLoadPost]= useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.postReducer);
    useEffect(()=>{
        if(loadPost){
            dispatch(getPosts());
            setLoadPost(false)
        }
    },[loadPost,dispatch])
  return (
    <div className="Filter">
        <ul className="filter_img_container">
            {!isEmpty(posts[0])&&
             posts.map((post) => {
                if (post.category === category && (post.picture || post.video) ) {
                  return (
                    <li className="postsleft" key={post._id}>
                      <div className="postInfo">
                        <h4>{post.category}</h4>
                        {post.picture && (<img className="filter-img" src={post.picture} alt="post-pic" />)}
                      </div>
                    </li>
                  );
                } 
                return null;
              })
            }
        </ul>
    </div>
  )
}
