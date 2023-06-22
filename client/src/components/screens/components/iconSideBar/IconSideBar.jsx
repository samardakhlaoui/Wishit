import React from 'react'
import "./iconSideBar.scss"
import {
    Chat,
    Group,
    Home,
    Person,
    Redeem,
    Settings,
    AddOutlined,
    Message,
    Logout
  } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
const IconSideBar = () => {
    const user = useSelector((state)=> state.userReducer);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("admin");
        history.push("/Signin");
      };
  return (
<div className="sidebarchat">
        <div className="sidebarContainerchat">
          <ul className="List">
            <Link to="/profile" className="custom-link">
              <li className="ListItem"> 
              <img
                src={user.profilePicture ? "../" + user.profilePicture : PF + "profile/hacker.png"}
                alt=""
            />
              </li>
            </Link>
            <Link to="/" className="custom-link"><li className="ListItem"><Home /></li></Link>
            <Link to="/profile" className="custom-link"><li className="ListItem"><Person /></li></Link>
            <Link to="/list" className="custom-link"><li className="ListItem"><Redeem /></li></Link>
            <Link to="/newpost" className="custom-link"><li className="ListItem"><AddOutlined /></li></Link>
            <Link Link to="/chat"  className="custom-link"><li className="ListItem"><Message /></li></Link>
            <Link to="/friendsList" className="custom-link"><li className="ListItem"><Group /></li></Link>
            <Link to="/settings" className="custom-link"><li className="ListItem"><Settings /></li></Link>
            <Link className="custom-link">
              <li className="ListItem " >
              <Logout  onClick={logoutHandler} />
              </li>
            </Link>
          </ul>
        </div>
      </div>
  )
}

export default IconSideBar;