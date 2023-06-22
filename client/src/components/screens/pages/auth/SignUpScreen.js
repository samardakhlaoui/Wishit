import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUpScreen.css";
import "./auth.css";

const SignUpScreen = ({ history }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("Tunisia");
  const [gender, setGender] = useState("Female");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken") ) {
      history.push("/");
    }
  }, [history]);

  const signupHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {

      const  {data}  = await axios.post(
        "/api/auth/signup",
        {
          fullName,
          email,
          password,
          dateOfBirth,
          country,
          gender,
        },
        config
      );
      console.log(data);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("admin", data.admin);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="signup-screen">
     <button className="signin-screen__subbtn"> 
        <Link to="/Signin" className="signin_btn">Sign In</Link>
        <Link to="/Signup" className="signup_btn">Sign Up</Link>
      </button> 
      <form onSubmit={signupHandler} className="signup-screen__form">
        <h3 className="signup-screen__title" style={{fontFamily:"sail", color:"#FADC6D", fontSize:"35px", fontWeight:"lighter"}}>Wishit</h3>
        <h3 className="signup-screen__title" style={{fontSize:" 25px",fontWeight: "bolder"}}> Welcome!</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name"> Enter Your FullName</label>
          <input
            type="text"
            required
            id="name"
            placeholder="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Your Password</label>
          <input
            type="password"
            required
            id="confirmPassword"
            autoComplete="true"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
            <label htmlFor="dateOfBirth">Enter Your Date of Birth</label>
            <input 
                type="date"
                required
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
        </div>
        <div className="form-group_same_line"> 
            <div className="form-group">
                <label htmlFor="country">Select Your Country</label>
                <select 
                  type="text"
                  required
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
              >
                  <option value="Tunisia">Tunisia</option>
                  <option value="France">France</option>
                  <option value="Egypt">Egypt</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="gender">Select Your Gender</label>
                <select 
                  type="text"
                  required
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
              >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;