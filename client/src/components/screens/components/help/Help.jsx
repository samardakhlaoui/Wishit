import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './help.scss';
import axios from 'axios';
import { FiLoader } from 'react-icons/fi';

const Help = () => {
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!msg) {
      setError('Please write your request before sending.');
      return;
    }
    setIsLoading(true);

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/api/users/sendRequest',
        {
          msg: `${msg}\nfrom: ${user.email}`,
        },
        config
      );
      console.log(data); // success message will be logged to the console
      setMsg(''); // clear the input field
      setIsLoading(false);
      setSuccess('Email Sent');
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      console.log(err);
      setError('Email could not be sent');
      setTimeout(() => {
        setError('');
      }, 5000);
      setIsLoading(false);
    }
  };

  return (
    <div className="help">
      <div className="header sameLine">
        <h2>Help</h2>
        <img
          src={user.profilePicture ? `../${user.profilePicture}` : `${PF}profile/hacker.png`}
          alt=""
          className="profilePic"
        />
      </div>
      <h3>Send us your request and we’ll answer you within 48 hours.</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="msg"
          type="text"
          required
          id="msg"
          placeholder="Enter your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="send-btn">
          {isLoading ? <FiLoader className="loader" /> : 'Send'}
        </button>
      </form>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  );
};

export default Help;
