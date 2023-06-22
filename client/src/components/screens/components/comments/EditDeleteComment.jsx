import React, { useState } from 'react'
import {  Edit,  DeleteOutlined, CloseOutlined } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteComment, updateComment } from '../../../../actions/post.actions';
import { useDispatch } from 'react-redux';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};
export default function EditDeleteComment({ comment, postId }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editModalOpen, setEditModalOpen]= useState(false);
    const [updatedText, setUpdatedText]= useState("");
    const dispatch = useDispatch();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
      };
   const updateItem = (e) => {
    if (comment.text !== updatedText && updatedText.length > 0){
        dispatch( updateComment(postId, comment._id, updatedText));
        setUpdatedText("");
      }
    }

   const  deletQuote =()=>{
    dispatch(deleteComment(postId, comment._id))
   }
   console.log(comment.commenterName);
   console.log(comment.text);
  return (
    <>
        <MoreVertIcon className="post__more-icon" onClick={handleMenuOpen} style={{alignSelf:'center'}}/>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={()=> setEditModalOpen(true) }> <Edit /></MenuItem>
          <MenuItem onClick={()=>{if (window.confirm('This will delete your comment!')){deletQuote()}}}> <DeleteOutlined /></MenuItem>
        </Menu> 
        <Modal
                style={{width:"35%"}}
                open={editModalOpen} 
                onClose={()=> setEditModalOpen(false) }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{justifyContent:" space-between",display: "flex"}}>
                    Want To Change Your Caption!
                    <span className="edit_cross" onClick={()=> setEditModalOpen(false) }><CloseOutlined /></span>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <textarea
                  
                  style={{border:'none', outline:"none", width:" 306px", height:" 46px", overflow:"hidden"}}
                    type="text"
                    placeholder={comment.text}
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button className="btn_update" onClick={updateItem}>Save Changes</button>
                  </Typography>
                </Box>
          </Modal>

    </>
  )
}
