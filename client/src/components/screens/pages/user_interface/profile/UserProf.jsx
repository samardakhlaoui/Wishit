import "./profile.scss";
import "./userProf.css";
import Posts from "../../../components/posts/Posts"
import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { Menu, MenuItem } from "@mui/material";
import { MoreHoriz,  } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadPicture } from "../../../../../actions/user.actions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FollowHandler from "./FollowHandler";
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);


  const [error,setError] = useState();
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);
  const [openFollowing, setOpenFollowing] = React.useState(false);
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const inputRef = useRef(null);
  const [file, setFile] =useState();
  const users = useSelector((state)=> state.usersReducer)
  const user = useSelector((state)=> state.userReducer);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const handleProfileClick = () => {
    inputRef.current.click();
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    // Handle the selected file here
    
  };


 useEffect(() => {
    if (file) {
      const data = new FormData();
      data.append("email", user.email);
      data.append("userId", user._id);
      data.append("image", file);
      console.log('from upload'+ user._id)
  
      dispatch(uploadPicture(data, user._id));
    }

  }, [dispatch, file, user.email, user._id,user]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return error ? (
    <span className="error-message">{error}</span>
    ) : (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <div>
          <img
            src={user.profilePicture ?  user.profilePicture : PF + "profile/hacker.png"}
            alt=""
            className="profilePic"
            onClick={handleProfileClick}
          />
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
            multiple={false}
          />
        </div>
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <div className="friends" style={{display:"grid"}}> 
              <button  onClick={handleOpenFollowers} style={{backgroundColor:"#FCDF78", marginBottom:"3px",fontWeight:" 700"}}>Followers: {user.followers? user.followers.length : ""}</button>
              <Modal
                open={openFollowers}
                onClose={handleCloseFollowers}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Followers
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ul>
                   {user && user.followers.map((follower) => {
                     
                          return (
                            <li className="friendsleft" key={follower._id}>
                              <div className="friendInfo">
                              <img  src={follower.profilePicture ?  follower.profilePicture : PF + "profile/hacker.png"} alt="user-pic" />
                              <h4>{follower.fullName}</h4>
                              </div>
                              <div className="follow-handler">
                              <FollowHandler idToFollow={follower._id}/>
                              </div>
                            </li>
                          );
                        
                      
                      return null;
                    })} 
                    </ul>
                  </Typography>
                </Box>
              </Modal>
              <button  onClick={handleOpenFollowing}  style={{backgroundColor:"#FCDF78", fontWeight:" 700"}}>Following: {user.following? user.following.length : ""}</button>
              <Modal
                open={openFollowing}
                onClose={handleCloseFollowing}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Following
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ul>
                     {user && user.following.map((follower) => {
                     
                     return (
                       <li className="friendsleft" key={follower._id}>
                         <div className="friendInfo">
                         <img  src={follower.profilePicture ?  follower.profilePicture : PF + "profile/hacker.png"} alt="user-pic" />
                         <h4>{follower.fullName}</h4>
                         </div>
                         <div className="follow-handler">
                         <FollowHandler idToFollow={follower._id}/>
                         </div>
                       </li>
                     );
                   
                 
                 return null;
               })} 
                    </ul>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="center">
            <span>{user.fullName}</span>
          </div>
          <div className="right">
            <MoreHoriz className="dropdown-icon" onClick={handleMenuOpen} />
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              className="dropdown-menu"
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/newpost" className="dropdown-link">
                  New Post
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="../settings" className="dropdown-link">
                  Edit Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/wishlist" className="dropdown-link">
                  View Wishlist
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <Posts userId={user._id}/>
      </div>
    </div>
  );
};

export default Profile;
