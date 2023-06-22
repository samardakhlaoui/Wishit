import { useState,  useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignInScreen.css";
import "./auth.css";

const SignInScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken") ) {
      history.push("/");
    } 
  }, [history]);

  const signinHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("admin", data.admin);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      console.log(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
    <div className="signin-screen">
    <button className="signin-screen__subbtn"> 
        <Link to="/Signin" className="signin_btn">Sign In</Link>
        <Link to="/Signup" className="signup_btn">Sign Up</Link>
    </button> 
      <form onSubmit={signinHandler} className="signin-screen__form">
        <h3 className="signin-screen__title" style={{fontFamily:"sail", color:"#FADC6D", fontSize:"35px", fontWeight:"lighter"}}>Wishit</h3>
        <h3 className="signin-screen__title" style={{fontSize:" 25px",fontWeight: "bolder"}}> Welcome Back !</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email"> Enter Your Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Enter Your Password</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        <Link to="/forgotpassword" className="signin-screen__forgotpassword"> Forgot Password?</Link>
      </form>
     
    </div> 
    </>
  );
};

export default SignInScreen;