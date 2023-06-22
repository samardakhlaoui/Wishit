import { useEffect, useState } from 'react';
import './content.scss';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { CloseOutlined, Delete } from '@mui/icons-material';
import { deletePost } from '../../../../../actions/post.actions';
import Comments from '../../../components/comments/Comments';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Content = () => {
  const posts = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const [postss, setPostss] = useState([]);
  const [postPopup, setPostPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [userDetails, setUserDetails] = useState({});
  const [showWrite, setShowWrite]= useState(false);


  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPostss(res.data);
  
      const userIds = res.data.map((post) => post.creator);
      const usersRes = await axios.get(`/api/users?ids=${userIds.join(',')}`);
      const usersData = usersRes.data;
  

      const usersMap = {};
      usersData.forEach((user) => {
        usersMap[user._id] = user;
      });
  
     
      setUserDetails(usersMap);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteQuote = async (postId) => {
    dispatch(deletePost(postId));
    fetchPosts();
  };

  const openPostPopup = (post) => {
    setSelectedPost(post);
    setPostPopup(true);
  };

  const closePostPopup = () => {
    setPostPopup(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Post's Type</th>
            <th>Creator</th>
            <th>Number of likes</th>
            <th>Number of comments</th>
            <th>Created at</th>
            <th>Reported</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(postss) &&
            postss.map((post) => (
              <tr key={post._id} onClick={() => openPostPopup(post)}>
                <td>{post.category}</td>
                <td>{userDetails[post.creator]?.fullName}</td>
                <td>{post.likers ? post.likers.length : 0}</td>
                <td>{post.comments ? post.comments.length : 0}</td>
                <td>{moment(post.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                <td>{post.reported ? post.reported : "False"}</td>
                <td>
                
                  <Delete onClick={()=>{if (window.confirm('This will delete the post!')){deleteQuote(post._id)}}}/> 
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {postPopup && selectedPost && (
        <div className="popupContainer">
          <div className="modal">
            <span className="cross" onClick={closePostPopup}>
              <CloseOutlined />
            </span>
            <div className="post__header">
              <div className="user">
                <img
                  className="user__image"
                  src={userDetails[selectedPost.creator]?.profilePicture || PF + 'profile/hacker.png'}
                  alt={selectedPost.fullName}
                />
                <div className="head">
                  <div className="user__details">
                    <Link to={`/profile/${selectedPost.creator}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="user__name">{userDetails[selectedPost.creator]?.fullName}</h3>
                    </Link>
                    <span className="post__date">{moment(selectedPost.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                  </div>
                  <span className="post__category">{selectedPost.category}</span>
                </div>
              </div>
            </div>
            <div className="post__image-container">
              {selectedPost.picture && (
                <img className="post__image" src={selectedPost.picture} alt="" onClick={closePostPopup} />
              )}
              {selectedPost.video && (
                <iframe
                onClick={closePostPopup}
                width="500"
                height="300"
                src={selectedPost.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedPost._id}
              ></iframe>
              )}
              </div>
              <Comments post={selectedPost} showWrite={false}/>
              </div>
              </div>
              )}
              
              </div>
              );
              };
              
              export default Content;
