import "./profile.scss";
import Posts from "../../../components/posts/Posts"
import React, { useState, useEffect } from 'react';
import { MoreHoriz } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router";
import FollowHandler from "./FollowHandler";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
  const [openFollowers, setOpenFollowers] = React.useState(false);
  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);
  const [user, setUser] = useState({});
  const [error,setError] = useState();
  const id= useParams().id
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const cUser = useSelector((state)=> state.userReducer);

  /*useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
  }, [userId]);*/
  useEffect(()=>{
    const fetchUser = async() =>{
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [id]);
  


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
        <img
          src={user.profilePicture ? "../" + user.profilePicture : PF + "profile/hacker.png"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
          {cUser._id !== user._id &&
              <FollowHandler idToFollow={user._id}/>
          }
          </div>
          <div className="center">
            <span>{user.fullName}</span>
          </div>
          <div className="right">
            <MoreHoriz className="dropdown-icon" onClick={handleOpenFollowers} />
            <Modal
                open={openFollowers}
                onClose={handleCloseFollowers}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {user.fullName}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ul>
                     <li>Education: {user.education}</li>
                     <li>Job: {user.job}</li>
                     <li>Bio: {user.bio}</li>
                    </ul>
                  </Typography>
                </Box>
              </Modal>
          </div>
        </div>
        <Posts userId={user._id}/>
      </div>
    </div>
  );
};

export default Profile;
