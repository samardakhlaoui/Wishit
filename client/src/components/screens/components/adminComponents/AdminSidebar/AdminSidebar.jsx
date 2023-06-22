import React from 'react'
import "./adminSidebar.scss"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MmsOutlinedIcon from '@mui/icons-material/MmsOutlined';
import {
    Home,
    Logout
  } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
const AdminSidebar = () => {
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
<div className="adminsidebarchat">
        <div className="adminsidebarContainerchat">
        <div className="wrap">
          <ul className="adminList">
            <Link to="/" className="custom-link">
              <li className="adminListItem"> 
              <img
                src={user.profilePicture ? "../" + user.profilePicture : PF + "profile/hacker.png"}
                alt=""
            />
              </li>
            </Link>
            <Link to="/" className="custom-link"><li className="ListItem"><Home /></li></Link>
            <Link to="/users" className="custom-link"><li className="ListItem"><PeopleAltOutlinedIcon /></li></Link>
            <Link to="/content" className="custom-link"><li className="ListItem"><MmsOutlinedIcon /></li></Link>
            <Link className="custom-link">
              <li className="ListItem " >
              <Logout className="sidebarIcon" onClick={logoutHandler} />
              </li>
            </Link>
            
          </ul>
        </div>
        </div>
      </div>
  )
}

export default AdminSidebar;