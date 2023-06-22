import Home from "./home/Home";
import {
  Route,
  Switch,
} from "react-router-dom";
import Profile from "./profile/Profile";
import UserWishList from "./wishlist/UserWishList";
import OtherWishList from"./wishlist/OtherWishList";
import UserProf from "./profile/UserProf";
import List from "./List/List";
import NewPost from "./NewPost/NewPost";
import PersonalInfo from "../../components/editPersonalInfo/PersonalInfo";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import "./PrivateScreen.scss";
import FriendsList from "./friendsList/FriendsList";
import Settings from "./settings/setting";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../actions/user.actions";
import Filter from "../../components/Filter/Filter";
import {ChatContextProvider} from '../../context/ChatContext'
import Chat from "./Chat/Chat"

function App() {

  const [category, setCategory]= useState('');
  const Layout = ({ children, history }) => {
    const { pathname } = useLocation();
    const { darkMode } = useContext(DarkModeContext);
    return  (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Topbar setCategory={setCategory} />
        <div style={{ display: "flex" , justifyContent:"center" }}>
          {pathname !== "/chat" && pathname !== "/settings" && pathname !== "/settings/appearance&interest" && pathname !== "/settings/help" && <Sidebar/>}
          <div style={{ flex:5}}>{children}</div>
          {pathname !== "/chat" && pathname !== "/list" && pathname !== "/newpost"  && pathname !== "/settings" && pathname !== "/settings/appearance&interest" && pathname !== "/settings/help"  && <Rightbar />}
        </div>
      </div>
    );
  };
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (userId) dispatch(getUser(userId));
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [userId,dispatch]);

  return (
    <div>
      <ChatContextProvider>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <UserProf />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/newpost">
              <NewPost />
            </Route>
            <Route exact path="/wishlist">
              <UserWishList />
            </Route>
            <Route exact path="/wishlist/:id">
              <OtherWishList />
            </Route>
            <Route path="/friendsList">
              <FriendsList />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/editpersonalinfo">
              <PersonalInfo />
            </Route>
            <Route path="/filter">
              <Filter category={category}/>
            </Route>
          </Switch>
        </Layout>
        </ChatContextProvider>
    </div>
  );
}

export default App;






