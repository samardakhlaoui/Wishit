import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/pages/user_interface/PrivateScreen";
import AdminScreen from "./components/screens/pages/admin_interface/AdminScreen";
/*import Auth from "./components/screens/pages/auth/Auth";*/
import SignInScreen from "./components/screens/pages/auth/SignInScreen";
import SignUpScreen from "./components/screens/pages/auth/SignUpScreen";
import ForgotPasswordScreen from "./components/screens/pages/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/pages/auth/ResetPasswordScreen";
import "./App.css";



const App = () => {


  return (

    <Router>
      <div className="app">
        <Switch>
        
          <Route exact path="/Signin" component={SignInScreen} />
          <Route exact path="/Signup" component={SignUpScreen} />
          <Route exact path="/ForgotPassword" component={ForgotPasswordScreen}/>
          <Route exact path="/Passwordreset/:resetToken" component={ResetPasswordScreen}/>
          <PrivateRoute  path="/" component={PrivateScreen} adminComponent={AdminScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;