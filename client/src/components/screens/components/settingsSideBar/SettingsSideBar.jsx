
import "./settingssidebar.scss";
import { useHistory } from "react-router-dom";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link } from "react-router-dom";



export default function SettingsSideBar() {
  const history = useHistory();
    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      history.push("/Signin");
    };


  return (
    <div className="settingssidebar">
      <div className="settingsSidebarContainer">
      <div className="settingsSidebarWrapper">
        <h2 className="title">Settings</h2>
        <ul className="settingsSidebarList">
          <Link to="/settings" className="custom-link">
          <li className="sidebarListItem">
            <ModeEditOutlinedIcon color="action" className="sidebarIcon" />
            <span className="sidebarListItemText">Personal info</span>
          </li>
          </Link>
          <Link to="/settings/appearance&interest"  className="custom-link">
          <li className="sidebarListItem">
            <SettingsOutlinedIcon color="action" className="sidebarIcon" />
            <span className="sidebarListItemText">Appearance & interests</span>
          </li>
          </Link>
          <Link to="/settings/help" className="custom-link">
          <li className="sidebarListItem">
            <HelpOutlineOutlinedIcon  color="action" className="sidebarIcon" />
            <span className="sidebarListItemText">Help</span>
          </li>
          </Link>
        </ul>
    
      </div>
      </div>
    </div>
  );
}