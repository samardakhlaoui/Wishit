import "./topbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import {  GroupAddOutlined, Tune } from "@mui/icons-material";
import { Select, MenuItem } from '@mui/material';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Notifications from "../chat/Notifications";


const Topbar = ({setCategory}) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [showSearch, setShowSearch] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state)=> state.userReducer);
  const [recipientChat,setRecipientChat] = useState({})
  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleSearchCloseClick = () => {
    setShowSearch(false);
  };
  const history = useHistory();

  return (
    <div className="navbar">

        <Link className="logo" to="/" style={{ textDecoration: "none" }}>
          <span>W<span className="wlogo">ishit</span></span>
        </Link>
       <div className="middle">
      <div className="left">
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search here" />
        </div>
        <Select
          className="form-control btn"
          id="eventType"
          value={setCategory}
          onChange={(e) => {
            setCategory(e.target.value);
            history.push('/filter');
          }}
          renderValue={() => <span className="placeholder">Filter</span>}
          IconComponent={() => <Tune style={{ fontSize: "1rem", color: "white" }} />}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Birthday">Birthday</MenuItem>
          <MenuItem value="Baby Shower">Baby Shower</MenuItem>
          <MenuItem value="Marriage">Marriage</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>


      </div>
      </div>
      <div className="right">
      {/*<div className="search">
          <SearchOutlinedIcon onClick={handleSearchClick}/>
        </div>*/}
        <div style={{justifyContent :' space-around',    display: 'inline-flex', alignItems:'center', width:"90%"}}>
          <Notifications setRecipientChat={setRecipientChat} />
        </div>
      <GroupAddOutlined className="groupadd"/>
        <div className="user">
          <img
             src={"../"+user.profilePicture ||  PF+"profile/hacker.png"}
            alt=""
          />
          <span>{user.fullName}</span>
        </div>
      </div>
      {showSearch && (
        <div className="search-container">
          <input type="text" placeholder="Rechercher..." />
          <button className="search-close" onClick={handleSearchCloseClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Topbar;