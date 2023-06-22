import { useSelector } from "react-redux";
import "./rightbar.scss"
import { useEffect, useState } from "react";
import { isEmpty } from "../Routes/Utils";
import FollowHandler from "../../pages/user_interface/profile/FollowHandler";
export default function Rightbar() {
    const [isloading,setIsloading]= useState(true);
    const [playOnce,setPlayOnce]= useState(true);
    const [friendsHint,setFriendsHint]= useState([]);
    const users = useSelector((state)=> state.usersReducer)
    const user = useSelector((state)=> state.userReducer);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect (()=>{
        const notFriendList = ()=>{
            let array = [];
            users.map((hint)=>{
                if (hint._id !== user._id && !hint.followers.includes(user._id) && !hint.isAdmin ){
                    return array.push(hint._id);
                }
            });
            array.sort(()=> 0.5 - Math.random());
            setFriendsHint(array);
            console.log(friendsHint)
        }
        if(playOnce && !isEmpty(users[0]) && !isEmpty(user._id) ){
            notFriendList();
            setIsloading(false);
            setPlayOnce(false);
        }
    },[user,users,playOnce,friendsHint])
    return (
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <div className="title">
                    <span className="requests"> Friend Suggestions</span>
                    </div>
                    {isloading? (
                        <div className="icon">
                            <i className="fas fa-spinner fa-pulse"></i>
                        </div>
                    ):(                    
                    <div className="users">
                    <ul>
                   {friendsHint && friendsHint.map((hint) => {
                        for (let i=0 ; i< users.length;i++){
                        if (hint === users[i]._id){
                          return (
                            <div className="user" style={{display:"flex"}}>
                            <li  className="userr" key={users[i]._id}>
                                <div className="userInfo" style={{alignItems: "center"}}>
                                <img  src={users[i].profilePicture ?  users[i].profilePicture : PF + "profile/hacker.png"} alt="user-pic" />
                                    <span >{users[i].fullName}</span>
                                </div>
                              <FollowHandler idToFollow={users[i]._id} style={{alignSelf:'center'}}/>
                            </li>
                            </div>
                          );
                        }}
                      return null;
                    })} 
                    </ul>
                    </div>)}
                </div>
            </div>
        </div>
    )
}