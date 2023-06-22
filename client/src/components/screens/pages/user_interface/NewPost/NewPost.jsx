import "./newpost.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../../../../actions/post.actions";
import { isEmpty } from '../../../components/Routes/Utils';
function NewPost() {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [eventType, setEventType] = useState("");
  const user = useSelector((state)=> state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);
  const dispatch = useDispatch();
  // define event handlers for input fields
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleMediaChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleCancelPost = (e) => {
    setEventType("");
    setCaption("");
    setFile(null);
  };
  const handleSubmit = async () => {
    if (caption || file) {
      const data = new FormData();
      data.append('creator', user._id);
      data.append('caption', caption);
      if (file) data.append("file", file);
      data.append('category', eventType);

      await dispatch(addPost(data));
      dispatch(getPosts());
      handleCancelPost();
    } else {
      alert("you have to fill the fields")
    }
  };

  return (
    <div className="create-post-container" style={{ display: "flex" }}>
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          style={{ display: "inline-block", justifyItems: "center" }}
        >
          <h2 className="NewTitle">New Post</h2>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              className="form-control"
              id="caption"
              placeholder="Enter a caption"
              value={caption}
              onChange={handleCaptionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="media">Media</label>
            <input
              type="file"
              className="form-control-file"
              id="media"
              name="file"
              onChange={handleMediaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
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
          {!isEmpty(error.format) && <p>{error.format}</p>}
          {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
          <button style={{width:"40%"}} type="submit" className="btn btn-primary">
            Create Post
          </button>
          { caption || eventType || file ?(
          <button style={{marginLeft:'10px',width:"30%", background:"#e4e6eb"}} onClick={handleCancelPost} className="btn btn-primary">
            Cancel
          </button>) : null}
        </form>
      </div>
      <div className="preview-container">
        <div className="preview-header"><h2>Preview</h2></div>
        <div className="preview-body">
          <div className="user">
            <img className="user__image" src="https://picsum.photos/id/1018/400" alt="user" />
            <div className="user__details">
                <h3 className="user__name">Flen Fouleni</h3>
                
                <span className="post__date"> -9 days</span>
            </div>
          </div>
          {eventType ? <div className="preview-eventType">{eventType}</div> :<div className="preview-eventType">Event Type</div> }
          {file ? (
            <div className="preview-media">
              <img src={URL.createObjectURL(file)} alt="post media" />
            </div>
          ):(<div className="preview-media">
          <img src="https://picsum.photos/id/1018/400" alt="post media" />
        </div>)}
        {caption ? <div className="preview-caption">{caption}</div> :<div className="preview-caption">You insert your post details here</div> }
        </div>
      </div>
    </div>
  );
}

export default NewPost;
