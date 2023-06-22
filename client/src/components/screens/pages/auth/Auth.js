import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Screens
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";
/*import "../../../../App.css";*/

const Auth = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/Signin" component={SignInScreen} />
          <Route exact path="/Signup" component={SignUpScreen} />
          <Route exact path="/ForgotPassword" component={ForgotPasswordScreen}/>
          <Route exact path="/Passwordreset/:resetToken" component={ResetPasswordScreen}/>
        </Switch>
      </div>
    </Router>
  );
};

export default Auth;