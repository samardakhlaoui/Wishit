
const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all users

//get a user
exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).populate("followers").populate("following").populate("closeFriends");
      if (user) {
        res.status(200).json(user);
      }
      else{
        res.status(404).json("Not found");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
//get a user

//update a user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { password} = req.body;
      {/*if (password) {
        const salt = await bcrypt.genSalt(10);
        rest.password = await bcrypt.hash(password, salt);
      }*/}
      const user = await User.updateOne({_id: id}, { $set:{...req.body}});
      if (user.modifiedCount) {
        return res.status(200).send("updated");
      }
      res.status(200).send({ msg: "no modification" });
  } catch (err) {
    res.status(500).json(err);
  }
};



//update a user

//delete a user
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const {userId,isAdmin} = req.body
    if (id === userId || isAdmin){
        try{
            await User.findByIdAndDelete(id);
            res.status(200).json("User Deleted successfully")
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return res.status(403).json ("Access Denied!");
    }
  };
//delete a user

//follow a user
exports.followUser = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body
    if (id === userId){
        return res.status(403).json ("Invalid Action!");
    }else{
        try {
            const followUser = await User.findById(id)
            const followingUser =await User.findById(userId)
            if (!followUser.followers.includes(userId)){
                await followUser.updateOne({$push: {followers: userId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json(`You Are Now Following ${followUser.fullName}!`)
            }else{
                return res.status(403).json (`You Are Already Following ${followUser.fullName}!`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
  }; 
//follow a user

//add a user to close friends list
exports.addCloseFriend = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    if (id === userId) {
      return res.status(403).json("Invalid Action!");
    } else {
      try {
        const followUser /*tofollow*/= await User.findById(id);
        const followingUser/* Me */= await User.findById(userId);
        
        if (!followingUser.followers.includes(id) && !followUser.followers.includes(userId)) {
            return res.status(403).json(`you must follow each other first!`);
          }
        if (!followUser.followers.includes(userId)) {
          return res.status(403).json(`You are not following ${followUser.fullName}!`);
        }
        
        if (!followingUser.followers.includes(id)) {
          return res.status(403).json(`${followUser.fullName} is not following you!`);
        }
        
        if (followingUser.closeFriends.includes(id)) {
          return res.status(403).json(`${followUser.fullName} is already a close friend!`);
        }
  
        await followingUser.updateOne({ $push: { closeFriends: id } });
        res.status(200).json(`${followUser.fullName} is now a close friend!`);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

//unfollow a user
exports.unfollowUser = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body
    if (id === userId){
        return res.status(403).json ("Invalid Action!");
    }else{
        try {
            const followUser = await User.findById(id)
            const followingUser =await User.findById(userId)
            if (followUser.followers.includes(userId)){
                await followUser.updateOne({$pull: {followers: userId}})
                await followingUser.updateOne({$pull: {following: id}})
                if(followingUser.closeFriends.includes(id)){
                    await followingUser.updateOne({ $pull: { closeFriends: id } });
                }
                res.status(200).json(`You have Unfollowed ${followUser.fullName}!`)
            }else{
                return res.status(403).json (`You Are Already not Following ${followUser.fullName}!`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
  }; 
//unfollow a user

//remove a user from close friends
exports.removeCloseFriend = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    if (id === userId) {
      return res.status(403).json("Invalid Action!");
    } else {
      try {
        const followUser /*tofollow*/= await User.findById(id);
        const followingUser/* Me */= await User.findById(userId);
        
        if (followingUser.closeFriends.includes(id)) {
            await followingUser.updateOne({ $pull: { closeFriends: id } });
            res.status(403).json(`${followUser.fullName} Is No Longer A Close Friend!`);
        }else{
            return res.status(403).json (`${followUser.fullName} Is Already Not A Close Friend!`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };
//remove a user from close friends

//send request
exports.sendRequest = async (req, res, next) => {

  const { msg } = req.body;
  const message = `
  <p>${msg}</p>
`;
    try {
      await sendEmail({
        to: "eya.chtourou@etudiant-isi.utm.tn ",
        subject: "User Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);
      return next(new ErrorResponse("Email could not be sent", 500));
      
    }
  } 
  //send request