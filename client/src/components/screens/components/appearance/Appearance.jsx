import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./appearance.scss"
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../../actions/user.actions';
const Appearance = () => {
  const [education, setEducation] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const user = useSelector((state)=> state.userReducer);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();


  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await dispatch(updateUser(user._id, {education,job,bio}));
      setSuccessMessage("Account updated successfully");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='appearance'>
      <h2>Appearance & interest</h2>
      <div className="part1">
        <h3>Manage your account’s appearance.</h3>
        <div className="list">
          <ul className='items'>
            <li class="nav-item">
              <a class="nav-link " href="#">Change account photo</a>
              <ArrowForwardIosIcon/>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="#">change cover photo</a>
              <ArrowForwardIosIcon/>
            </li>
            <li class="nav-item sauf">
              <a class="nav-link " href="#">account status</a>
              <ArrowForwardIosIcon/>
            </li>
          </ul>
        </div>
      </div>
      <div className="part2">
        <h3>Additional informations.</h3>
        <div className="additionalInfo">
        {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="education">Add Education</label>
            <input
              type="text"
              name='education'
              id="education"
              placeholder="education level"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="job"> Add Job</label>
            <input
              type="job"
              name='job'
              id="job"
              placeholder="job position"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="bio"> Add Bio</label>
            <input
              type="bio"
              name='bio'
              id="bio"
              placeholder="Describe yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <button type="submit" className="bttn">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Appearance;