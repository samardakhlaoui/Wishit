const express = require ('express');
const router = express.Router();
const { readPost, createPost, updatePost, deletePost, likePost, readTimelinePost, commentPost, editCommentPost, deleteCommentPost, readProfilePost } = require('../controllers/posts.js');
const multer = require("multer");
const upload = multer();
router.get('/', readPost);
router.get('/:id', readTimelinePost);
router.get('/profile/:id', readProfilePost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/likepost/:id', likePost);


// comments
router.patch('/commentpost/:id', commentPost);
router.patch('/editcommentpost/:id', editCommentPost);
router.patch('/deletecommentpost/:id', deleteCommentPost);

module.exports = router ;
