const mongoose =require("mongoose");

const chatSchema = new mongoose.Schema({
    members: Array,
},{timestamps:true,
});

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;