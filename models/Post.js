const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Birthday','Marriage','Baby Shower','Event','Other'],
        required: true
      },
      reported: {
        type: Boolean,
        default: false,
      }, 
      caption :{
        type:String,
        maxlength:500,
      } ,
      picture:{
        type:String,
        default:""
      },
      video:{
        type:String,
        default:""
      },
      creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
      },
      likers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      }],
      createdAt: {
        type: Date,
        default: Date.now()
      }, 
      comments:{
        type:[
          {
            commenterId:String,
            commenterName:String,
            text:String,
            timestamp: Number,
          }
        ],
        required :true,
      },


},{timestamp: true});
const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
