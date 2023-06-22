const express = require ('express');
const router = express.Router();

const { signup,signin, forgotPassword, resetPassword } = require('../controllers/auth');

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);




module.exports = router ;
