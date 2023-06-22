import './list.scss';
import React, { useEffect, useState } from "react";
import beach from "../../../../../themes/beach.jpg";
import dogs from "../../../../../themes/dogs.jpg";
import flower from "../../../../../themes/flower.jpg";
import friends from "../../../../../themes/friends.jpg";
import leaf from "../../../../../themes/leaf.jpg";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {  createList } from '../../../../../actions/giftlist.actions';
import {useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../../../actions/post.actions';
import html2canvas from 'html2canvas';
const themeOptions = [
  { value: "", label: "Select a theme" },
  { value: "beach", label: "Theme1" },
  { value: "dogs", label: "Theme2" },
  { value: "flower", label: "Theme3" },
  { value: "friends", label: "Theme4" },
  { value: "leaf", label: "Theme5" },
];

export default function List() {
  const [theme, setTheme] = useState("");
  const [eventType, setEventType] = useState("");
  const [gifts, setGifts] = useState([{name:'', description:''}]);
  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState(null);
  const user = useSelector((state)=> state.userReducer);
  const dispatch = useDispatch();
  const previewImage =
    theme === "beach"
      ? beach
      : theme === "dogs"
      ? dogs
      : theme === "flower"
      ? flower
      : theme === "friends"
      ? friends
      : leaf;


  // define event handlers for input fields
  const handleGiftsChange = (index, key, value) => {
    const newGifts = [...gifts];
    newGifts[index][key] = value;
    setGifts(newGifts);
  };

  const handleAddGift = () => {
    setGifts([...gifts, {name:'', description:''}]);
  };

  const handleRemoveGift = (index) => {
    const newGifts = [...gifts];
    newGifts.splice(index, 1);
    setGifts(newGifts);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gifts ) {
      const listData = new FormData();
      listData.append('category', eventType);
      listData.append('gifts', JSON.stringify(gifts));
      listData.append('creator', user._id);
      listData.append("theme", theme);
      dispatch(createList({category:eventType,gifts:gifts,creator: user._id,theme}));
    } else {
      alert("You have to fill the fields");
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    if (isClicked === true) {
      const listPreview = document.querySelector('.list-preview-container');
      html2canvas(listPreview).then((canvas) => {
        canvas.toBlob((blob) => {
          const timestamp = Date.now(); 
          const fileName = `wishlist_${timestamp}.png`; 
          const imageFile = new File([blob], fileName, { type: 'image/png' });
          setFile(imageFile);
          const data = new FormData();
          data.append('creator', user._id);
          data.append('caption', `Hey, take a look at my wishlist! See it here: http://localhost:3000/wishlist/${user._id}`);
          data.append('category', eventType);
          data.append('file', file);
  
          // Create a new post with the image
          dispatch(addPost(data))
            .then(() => {
              // Reset the form and state
              setIsClicked(false);
              setFile(null);
            })
            .catch((error) => {
              console.error("Error creating post:", error);
              // Handle the error accordingly
            });
        });
      });
    }
  };
  
  

  return (
    <div className="create-list-container" style={{ display: "flex" }}>
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          style={{ display: "inline-block", justifyItems: "center" , width: "95%"}}
        >
          <h2 className="NewTitle">New List</h2>

          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
              name='category'
              className="form-control"
              id="eventType"
              value={eventType}
              onChange={handleEventTypeChange}
            >
              <option value="">Select an event type</option>
              <option value="Event">Event</option>
              <option value="Birthday">Birthday</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Marriage">Marriage</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {gifts.map((gift, index) => (
        <div key={index}>
          <div className="form-group">
          <label>
            Gift:
            <input
              name='name'
              type="text"
              value={gift.name}
              onChange={(e) => handleGiftsChange(index, 'name', e.target.value)}
            />
          </label>
          </div>
          <div className="form-group" >
            <label>
              Description:
              <input
                name='description'
                type="text"
                value={gift.description}
                onChange={(e) => handleGiftsChange(index, 'description', e.target.value)}
              />
            </label>
          </div>
          {index > 0 && (
            <button className='less' type='button' onClick={() => handleRemoveGift(index)}>
              Remove
            </button>
          )}
          {index === gifts.length - 1 && (
            <button className='more rotate' type='button' onClick={handleAddGift}>
              +
            </button>
          )}
        </div>
      ))}
          


          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              className="form-control"
              id="theme"
              value={theme}
              onChange={handleThemeChange}
            >
              {themeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {isClicked ? (
            <button className="btn btn-primary" onClick={handlePost}>
              Share as post
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" onClick={()=>{setIsClicked(true)}}>
              Create List
            </button>
          )}
        </form>
      </div>
      <div id="preview" className="list-preview-container" style={{width:"50%"}}>
        <h2 className="preview-header">Preview</h2>
        <div className="preview-container" style={{ backgroundImage: `url(${previewImage})`,backgroundSize: "100% 100%",height: "80vh", width:"75%" }}>
          <div className="preview-content">
            <div className="event-type">
              <p>{eventType}</p>
            </div>
            <div className="gifts">
              {gifts.map((gift, index) => (
                <div key={index} className="gift">
                  <div className='name-container' style={{display:"flex",justifyContent: "space-between"}}>
                  <p >Gift: {gift.name} </p>
                    <FavoriteBorderIcon/>
                  </div>
                  <div className='desc-container' style={{display:"flex",justifyContent: "space-between"}}>
                  <p >Description: {gift.description} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}