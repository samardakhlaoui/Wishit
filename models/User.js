const crypto = require('crypto');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { boolean } = require('webidl-conversions');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your FullName'],
    /*validate: {
      validator: function(v) {
        return /^[a-zA-Z ]*$/.test(v);
      },
      message: props => `${props.value} is not a valid name. Only letters and spaces are allowed.`
    }*/
  },
  email: {
    type: String,
    required: [true, 'Please enter your Email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
      'Email is not valid'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please enter your  Password'],
    minlength: 6,
    select: false
    /*validate: {
      validator: function(v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
      },
      message: props => `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number`
    }*/
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'gender is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Birth Date is required']
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  issignaled:{
    type:Boolean,
    default:false,
  },
  contactInfo: {
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    websites: [{
      type: String,
      default: ''
    }],
  },
  bio: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  job: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPhoto: {
    type: String,
    default: ''
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  closeFriends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  privacySettings: {
    type: Object,
    default: {
      profileVisibility: 'public',
      postVisibility: 'public',
    },
  },
  likes:{
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
},{timestamp: true});


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {  
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("users", UserSchema);

module.exports = User;