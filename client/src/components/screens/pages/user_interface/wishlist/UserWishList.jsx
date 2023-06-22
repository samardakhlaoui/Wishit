import { useDispatch, useSelector } from "react-redux";
import { deleteGiftlist, getSelfGiftlist } from "../../../../../actions/giftlist.actions";
import "./userwishlist.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useContext, useEffect, useState } from "react";
import beach from "../../../../../themes/beach.jpg";
import dogs from "../../../../../themes/dogs.jpg";
import flower from "../../../../../themes/flower.jpg";
import friends from "../../../../../themes/friends.jpg";
import leaf from "../../../../../themes/leaf.jpg";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ChatContext } from "../../../context/ChatContext";
import { CloseOutlined } from "@mui/icons-material";
import { baseUrl,getRequest } from "../../../../../utils/services";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export default function Wishlist({userId}) {
    const user = useSelector((state)=> state.userReducer);
    const [recipientChat,setRecipientChat] = useState({})
    const [textMessage,setTextMessage] =useState("")
    const [recipientU,setRecipientU] =useState({})
    const [listPopup, setListPopup] = useState(false);
    const giftList = useSelector((state) => state.giftlistReducer);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch= useDispatch()
    const {sendTextMessage,getMessages,userChats,updateCurrentChat} = useContext(ChatContext);
    const followersIds = user.followers.map((f) => f._id);
    const followingIds= user.following.map((f=>f._id))
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const combinedIds = user.followers.concat(user.following).filter((value, index, self) => self.indexOf(value) === index);
    const mutualFriends = user.following.filter((following) =>
    followersIds.includes(following._id)
  );

  const getRecipient= async()=>{
    let member1 = recipientChat.members[0] === user._id ? recipientChat.members[1] : recipientChat.members[0];
    const response = await getRequest(`${baseUrl}/users/${member1}`);
    setRecipientU(response)
    
    }
    
  useEffect(()=>{
    getRecipient();
  },[recipientChat])
  
    useEffect(() => {
      dispatch(getSelfGiftlist(user._id));
      }, [userId, user._id, dispatch]);

      const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
      };
      

      const handleSendClick = () => {
        const shortenURL = (url, maxLength) => {
          if (url.length <= maxLength) {
            return url;
          } else {
            return url.substring(0, maxLength - 3) + '...';
          }
        };
        
        const message =` Hey, take a look at my wishlist! See it here: ${shortenURL(`http://localhost:3000/wishlist/${user._id}`, 30)}`;
      
        sendTextMessage(message,user,recipientChat._id,setTextMessage);
      
        setListPopup(false);
      };
        
      const deleteQuote= () => {
        dispatch(deleteGiftlist(giftList[0]._id))
      }

      const previewImage =
      giftList.length > 0
        ? giftList[0].theme === "beach"
          ? beach
          : giftList[0].theme === "dogs"
          ? dogs
          : giftList[0].theme === "flower"
          ? flower
          : giftList[0].theme === "friends"
          ? friends
          : leaf
        : null;

  return (
    <div className="big-container">
    <div className="wishlist-container" style={{ backgroundImage: `url(${previewImage})`, backgroundSize:"100% 100%" }}>
        {giftList.length > 0 ? ( // Add this condition
      <div className="wishlist-content">
        <div className="event-type" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <p>{giftList[0].category}</p>
          <MoreVertIcon className="dropdown-icon" onClick={handleMenuOpen} />
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              className="dropdown-menu"
            >




              <MenuItem onClick={handleMenuClose}>
           
            <span onClick={() => setListPopup(true)}>Send as message</span>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/wishlist" className="dropdown-link">
                  Social Media
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="../wishlist" className="dropdown-link">
                  Edit List
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/wishlist" className="dropdown-link" onClick={()=>{if (window.confirm('This will delete your wishlist!')){deleteQuote()}}} >
                  Delete List 
                </Link>
              </MenuItem>
            </Menu>
        </div>
        <div className="gifts">
          {giftList[0].gifts.map((gift, index) => (
            <div key={index} className="gift">
              <div className='name-container' style={{display:"flex",justifyContent: "space-between"}}>
                <p >Gift: {gift.name}</p>
                <FavoriteBorderIcon
                  style={{ color: gift.isLiked ? 'red' : 'black' }}
                />
              </div>
              <div className='desc-container' style={{display:"flex",justifyContent: "space-between"}}>
                <p >Description: {gift.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        ): (<h3 style={{paddingTop:"15px", alignContent:"center" ,display: "flex", gap: "5px", alignItems: "center"}}>
        No List Found <ErrorOutlineOutlinedIcon/>
      </h3>
  ) }
    </div>
    {listPopup &&  
      <div className="popupContainer">
        <div className="modal">
          <span className="cross" onClick={() => setListPopup(false)}><CloseOutlined /></span>
         
          <div className="recipients">
        <ul >
          {combinedIds.map((friend) => (
            <li className="recipient" key={friend?._id}>
                <div className="left">
                  <img  src={friend.profilePicture ?  friend.profilePicture : PF + "profile/hacker.png"} alt="user-pic" />
                  <h4>{friend.fullName}</h4>
                </div>
                <div className="right">
                <button className="bouton" onClick={handleSendClick}>
                    Send
                  </button>

                    </div>
            </li>
          ))}
        </ul>
       
    </div>
    
        </div>
      </div> }
    </div>
  );
}
