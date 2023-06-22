import "./sidebar.scss";
import { useHistory } from "react-router-dom";
import {
  Chat,
  Group,
  Home,
  Person,
  Redeem,
  Settings,
  AddOutlined,
  Logout
} from "@mui/icons-material";
import { Link } from "react-router-dom";



export default function Sidebar() {
  const history = useHistory();
    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("admin");
      history.push("/Signin");
    };


  return (
    <div className="sidebar">
      <div className="sidebarContainer">
      <div className="sidebarWrapper">
        <ul className="SidebarList">
          <Link to="/" className="custom-link">
          <li className="sidebarListItem">
            <Home className="sidebarIcon" />
            <span className="sidebarListItemText">Home</span>
          </li>
          </Link>
          <Link to="/profile"  className="custom-link">
          <li className="sidebarListItem">
            <Person className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>
          </Link>
          <Link to="/list" className="custom-link">
          <li className="sidebarListItem">
            <Redeem className="sidebarIcon" />
            <span className="sidebarListItemText">Create new list</span>
          </li>
          </Link>
          <Link to="/newpost" className="custom-link">
          <li className="sidebarListItem">
            <AddOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Create new post</span>
          </li>
          </Link>
          <Link to="/chat" className="custom-link">
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          </Link>
          <Link to="/friendsList" className="custom-link">
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">friends'list</span>
          </li>
          </Link>
          <Link to="/settings" className="custom-link">
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">Settings</span>
          </li>
          </Link>
          <li className="sidebarListItem log" >
            <Logout className="sidebarIcon" />
            <span className="sidebarListItemText" onClick={logoutHandler}>logout</span>
          </li>
        </ul>
    
      </div>
      </div>
    </div>
  );
}