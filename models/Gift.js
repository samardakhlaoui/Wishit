const mongoose = require('mongoose')
const  GiftSchema = new mongoose.Schema({
  theme:String,
  category: {
      type: String,
      enum: ['Birthday','Marriage','Baby Shower','Event','Other'],
      required: [true, 'type is required']
    },
    gifts: [{
      name: String,
      description: String,
      isLiked: {
        type: Boolean,
        default: false
      },
    }],
    creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required : true
    },
    likers:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }],

},{timestamp: true});
const Gift = mongoose.model("gifts", GiftSchema);

module.exports = Gift;
