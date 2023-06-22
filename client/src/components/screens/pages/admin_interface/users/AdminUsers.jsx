import React from 'react';
import "./adminUsers.scss"
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from '../../../../../actions/users.actions';
const AdminUsers = () => {
  const users = useSelector((state)=> state.usersReducer);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("admin");
  const deleteQuote = (id) => {
    console.log('hemm')
    dispatch(deleteUser(id, userId, isAdmin));
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>ID</th>
          <th>Number of Followers</th>
          <th>Number of Following</th>
          <th>Reported</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) &&
          users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user._id}</td>
              <td>{user.followers ? user.followers.length : 0}</td>
              <td>{user.following ? user.following.length : 0}</td>
              <td>{user.issignaled ? user.issignaled : "False"}</td>
              <td>
                <DeleteIcon  onClick={()=>{if (window.confirm('This will delete the user\'s account!')){deleteQuote(user._id)}}} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AdminUsers;
