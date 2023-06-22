import { DeleteOutlined, Edit, ErrorOutlineOutlined, MoreHoriz, Redeem } from '@mui/icons-material';
import './friendsList.scss';
import { Menu, MenuItem } from "@mui/material";
import {  useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function FriendsList() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((state)=> state.userReducer);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
  const followersIds = user.followers.map((f) => f._id);

  const mutualFriends = user.following.filter((following) =>
    followersIds.includes(following._id)
  );

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
      setMenuOpen(true);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      setMenuOpen(false);
    };
    const openWishList = (friendId) => {
      history.push(`/wishlist/${friendId}`);
    };
  return (
    <div className="list">
        <ul >
          {mutualFriends.map((friend) => (
            <li className="friend" key={friend._id}>
                <div className="left">
                  <img  src={friend.profilePicture ?  friend.profilePicture : PF + "profile/hacker.png"} alt="user-pic" />
                  <h4>{friend.fullName}</h4>
                </div>
                <div className="right">
                  <button className="btn" onClick={() => openWishList(friend._id)}>
                    View list <Redeem /> 
                    </button>
                  <MoreHoriz className="post__more-icon" onClick={handleMenuOpen} />
                  <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMenuClose}>Edit Post <Edit /></MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete Post <DeleteOutlined /></MenuItem>
                    <MenuItem onClick={handleMenuClose}>Report Post <ErrorOutlineOutlined /></MenuItem>
                  </Menu>
                </div>
            </li>
          ))}
        </ul>
       
    </div>
  )
}
