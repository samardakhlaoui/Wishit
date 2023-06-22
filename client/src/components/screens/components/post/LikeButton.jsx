import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Favorite } from "@mui/icons-material";
import 'reactjs-popup/dist/index.css';
import { useDispatch } from "react-redux";
import { likePost } from "../../../../actions/post.actions";

export default function LikeButton({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [postLikers, setPostLikers] = useState(post.likers.length);

  useEffect(() => {
    setIsLiked(post.likers.includes(userId));
    setPostLikers(post.likers.length);
  }, [post.likers, userId]);

  const like = () => {
    dispatch(likePost(post._id, userId));
    setIsLiked((prevState) => !prevState);
    setPostLikers((prevState) =>
      prevState + (isLiked ? -1 : 1)
    );
  };

  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <>
      {isLiked ? (
        <>
          <Favorite
            className="post__action-icon"
            style={{ color: "red" }}
            title="Click to dislike"
            onClick={like}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {showMessage && (
            <div className="post__like-message">Click to dislike</div>
          )}
        </>
      ) : (
        <>
          <FavoriteBorderIcon
            className="post__action-icon"
            title="Click to dislike"
            onClick={like}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {showMessage && (
            <div className="post__like-message">Click to like</div>
          )}
        </>
      )}
      <span style={{ paddingTop: "9px", marginRight: "1px" }}>
        {postLikers}
      </span>
    </>
  );
}
