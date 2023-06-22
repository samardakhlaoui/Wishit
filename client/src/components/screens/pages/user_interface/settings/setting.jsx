import { useContext } from "react";
import {
    Route,
    Switch,
  } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import PersonalInfo from "../../../components/editPersonalInfo/PersonalInfo";
import Appearance from "../../../components/appearance/Appearance";
import Help from "../../../components/help/Help";
import SettingsSideBar from "../../../components/settingsSideBar/SettingsSideBar";
import IconSidebar from "../../../components/iconSideBar/IconSideBar";
function Settings() {

    const Layout = ({ children, history }) => {
        const { darkMode } = useContext(DarkModeContext);
        return  (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
               <div style={{ display: "flex" }}>
                    <IconSidebar style={{ flex: 0.35}}/>
                    <SettingsSideBar style={{ flex: 0.8}} />
                    <div style={{ flex: 3}}>{children}</div>
                </div>
          </div>
        );
      };

    return (
        <div>
            <Layout>
              <Switch>
                <Route exact path="/settings">
                    <PersonalInfo />
                </Route>
                <Route exact path="/settings/appearance&interest">
                  <Appearance />
                </Route>
                <Route exact path="/settings/help">
                  <Help />
                </Route>
              </Switch>
            </Layout>
        </div>
      );
    };
  export default Settings;