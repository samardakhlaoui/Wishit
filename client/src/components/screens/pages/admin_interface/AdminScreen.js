import "./adminScreen.scss";
import AdminHome from "./home/AdminHome";
import AdminUsers from "./users/AdminUsers";
import Content from "./content/Content";
import {
    Route,
    Switch,
  } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import AdminTopbar from "../../components/adminComponents/AdminTopbar/AdminTopbar";
import AdminRightbar from "../../components/adminComponents/AdminRightbar/AdminRightbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar/AdminSidebar";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../actions/user.actions";

export default function AdminScreen() {
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

    const Layout = ({ children }) => {
        const { darkMode } = useContext(DarkModeContext);  
        return  (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <AdminTopbar />
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ flex: 5 }}>{children}</div>
               <AdminRightbar />
            </div>
          </div>
        );
      };
  return (
    <div>
        <Layout>
          <Switch>
            <Route exact path="/">
              <AdminHome />
            </Route>
            <Route exact path="/users">
              <AdminUsers/>
            </Route>
            <Route exact path="/content">
              <Content />
            </Route>
          </Switch>
        </Layout>
    </div>
  )
}
