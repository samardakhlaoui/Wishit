import React, { useState } from 'react'
import "./personalInfo.scss"
import { useSelector } from 'react-redux';

const PersonalInfo = () => {
  const user = useSelector((state)=> state.userReducer);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("Tunisia");
  const [gender, setGender] = useState("Female");
  const [language, setLanguage] = useState("English");
  return (
    <div className='edit'>
      
      <div className="header sameLine" >
        <h2>Personal info</h2>
        <img
            src={user.profilePicture ?  user.profilePicture : PF + "profile/hacker.png"}
            alt=""
            className="profilePic"
          />
      </div>
      
      <form> 
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
          <input
            type="text"
            required
            id="name"
            placeholder={user.fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            required
            id="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div className="form-group country">
          <label htmlFor="country">Country</label>
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
          <label htmlFor="phone"> Phone Number</label>
          <input
            type="text"
            required
            id="phone"
            placeholder="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>


        <div className="sameLine">
          <div className="form-group col-md-6">
            <label htmlFor="dateOfBirth">Birth Date</label>
            <input 
                type="date"
                required
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6 GSright">
            <label htmlFor="gender">Gender</label>
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
        

        <div className="sameLine">
          <div className="form-group col-md-6">
            <label htmlFor="language">Language</label>
            <select 
              type="text"
              required
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="form-group col-md-6 GSright">
            <label htmlFor="gender">Relationship Status</label>
            <select 
              type="text"
              required
              id="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bttn">Save</button>
      </form>
    </div>
  )
}

export default PersonalInfo;