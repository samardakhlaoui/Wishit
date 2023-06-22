const express = require ('express');
const router = express.Router();
const { getUser, updateUser, deleteUser, followUser, addCloseFriend, unfollowUser, removeCloseFriend, sendRequest, getAllUsers } = require('../controllers/users.js');
const { uploadError } = require('../utils/uploadErrors');
const User = require("../models/User.js");
const multer = require("multer");
const path = require('path');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        const uploadPath = path.join(__dirname, '../client/public/uploads/profile/');
        console.log('uploadPath:', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) =>{
        cb(null,req.body.email+'.jpg');
    },
});
const upload = multer({storage: fileStorageEngine});
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/addclosefriend', addCloseFriend);
router.put('/:id/unfollow', unfollowUser);
router.put('/:id/removeCloseFriend', removeCloseFriend);
router.post('/sendRequest',sendRequest);
//upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Apply checks here
    if (
      req.file.mimetype !== 'image/jpg' &&
      req.file.mimetype !== 'image/png' &&
      req.file.mimetype !== 'image/jpeg'
    ) {
      throw Error('Invalid File Type!');
    }

    if (req.file.size > 500000) {
      throw Error('Size Unsupported!');
    }

    const userId = req.body.userId;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: `./uploads/profile/${req.file.filename}` },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully',
        user: updatedUser
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  } catch (err) {
    const errors = uploadError(err);
    console.error(errors);
    return res.status(201).json({ success: false, error: { errors } });
  }
});

module.exports = router ;
