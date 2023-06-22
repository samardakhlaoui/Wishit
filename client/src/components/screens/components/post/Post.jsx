import "./post.scss";
import {  ModeCommentOutlined, ShareOutlined, MoreHoriz, Edit,  DeleteOutlined, CloseOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import Comments from "../comments/Comments";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import moment from "moment";
import LikeButton from "./LikeButton";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import {  deletePost, updatePost } from "../../../../actions/post.actions";

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [postPopup, setPostPopup]= useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const location = useLocation();
  const isProfilePath = location.pathname === "/profile";
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedCaption, setUpdatedCaption]= useState("");
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchUser = async () =>{
      const res = await axios.get( `/api/users/${post.creator}`);
      setUser(res.data)
    }
    fetchUser();
  },[post.creator,post.likers] )

  const handlePostEdit = () => {
    setEditModalOpen(true);
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };
  const updateItem = ()=>{
    if (post.caption !== updatedCaption && updatedCaption.length > 0){
      dispatch( updatePost(post._id, updatedCaption))
    }
  }
 const  deletQuote =()=>{
  dispatch(deletePost(post._id))

 }

  return (
    <div className="post">
      <div className="post__header">
        <div className="user">
          <img className="user__image" src={user.profilePicture ? "../" + user.profilePicture : PF + "profile/hacker.png"} alt={user.fullName} />
          <div className="head">
            <div className="user__details">
              <Link to={`/profile/${post.creator}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3 className="user__name">{user.fullName}</h3>
              </Link>
              <span className="post__date">{moment(post.createdAt).fromNow()}</span>
            </div>
            <span className="post__category">{post.category}</span>
          </div>
        </div>
        {isProfilePath && (
          <>
        <MoreHoriz className="post__more-icon" onClick={handleMenuOpen} />
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={handlePostEdit}>Edit Post <Edit /></MenuItem>
          <MenuItem onClick={()=>{if (window.confirm('This will delete your post!')){deletQuote()}}}>Delete Post <DeleteOutlined /></MenuItem>
        </Menu>
          <Modal
                open={editModalOpen} 
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{justifyContent:" space-between",display: "flex"}}>
                    Want To Change Your Caption!
                    <span className="edit_cross" onClick={handleCloseEditModal}><CloseOutlined /></span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <textarea
                  
                  style={{border:'none', outline:"none", width:" 306px", height:" 46px", overflow:"hidden"}}
                    type="text"
                    placeholder={post.caption}
                    value={updatedCaption}
                    onChange={(e) => setUpdatedCaption(e.target.value)}
                  />
                  <button className="btn_update" onClick={updateItem}>Save Changes</button>
                  </Typography>
                </Box>
          </Modal>

        </>
        )}
        
      </div>
      <div className="post__image-container">
        {post.picture &&(
        <img className="post__image" src={"../"+ post.picture} alt="" onClick={()=> setPostPopup(true) }/>
        )}
        {post.video &&(
          <iframe
          onClick={()=> setPostPopup(true) }
          width="500"
          height="300"
          src={post.video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post._id}
        ></iframe>
        )}
      </div>
      <div className="post__caption">
        <span>{post.caption}</span>
      </div>
      <div className="post__actions">
        <div className="post__actions-left">
          <LikeButton post={post}/>
          <ModeCommentOutlined className="post__action-icon" onClick={() => {setCommentOpen(!commentOpen); setPostPopup(true);}}  />
          <span className="number-comments" style={{paddingTop:"9px", marginRight:"1px"}}>{post.comments.length}</span>
          <ShareOutlined className="post__action-icon" />
        </div>
      </div>
      {postPopup &&  
      <div className="popupContainer">
        <div className="modal">
          <span className="cross" onClick={() => setPostPopup(false)}><CloseOutlined /></span>
          <div className="post__header">
        <div className="user">
          <img className="user__image" src={user.profilePicture || PF+"profile/hacker.png"} alt={user.fullName} />
          <div className="head">
            <div className="user__details">
              <Link to={`/profile/${post.creator}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3 className="user__name">{user.fullName}</h3>
              </Link>
              <span className="post__date">{moment(post.createdAt).fromNow()}</span>
            </div>
            <span className="post__category">{post.category}</span>
          </div>
        </div>
      </div>
      <div className="post__image-container">
      {post.picture &&(
        <img className="post__image" src={post.picture} alt="" onClick={()=> setPostPopup(true) }/>
        )}
        {post.video &&(
          <iframe
          onClick={()=> setPostPopup(true) }
          width="500"
          height="300"
          src={post.video}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={post._id}
        ></iframe>
        )}
      </div>
      <Comments post={post} showWrite={true}/>
        </div>
      </div> }
    </div>
  );
};

export default Post;
