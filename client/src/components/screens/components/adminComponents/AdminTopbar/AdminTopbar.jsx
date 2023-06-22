import React from 'react';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from 'react-redux';
import "./adminTopbar.scss"
import { Link } from "react-router-dom";
const AdminTopbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state)=> state.userReducer);
  return (
    <div className="admin-topbar-container" >
       <Link className="logo" to="/" style={{ textDecoration: "none" }}>
        <h1 className='Adminlogo'>W</h1>
        </Link>
       <div className="search" >
          <SearchOutlinedIcon className='loop'/>
          <input className="search-input"  type="text" placeholder="Search here" />
       </div>
       <div className="hello">
        <h1>Hello, Admin</h1>
       </div>
       <div className="adminInfo">
        <div className="adminInfo-inner">
        <img className="adminPhoto"
            src={user.profilePicture ? "../" + user.profilePicture : PF + "profile/hacker.png"}
            alt=""
          />
          <span>{user.fullName}</span>
          </div>
       </div>
    </div>
  );
};

export default AdminTopbar;
