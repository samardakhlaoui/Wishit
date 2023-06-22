const MessageModel = require("../models/messageModel");

//createMessage
exports.createMessage = async(req,res)=>{
    const { chatId, senderId, text, isRecorded, audioMessage }= req.body;
    const message = new MessageModel({
        chatId, senderId, text, isRecorded, audioMessage
    })

    try{

        const response = await message.save();
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}


//getMessages
exports.getMessages = async(req, res)=>{
  const {chatId} = req.params;

  try{
    const messages = await MessageModel.find({chatId});
    res.status(200).json(messages);
  } catch(error){
    console.log(error);
    res.status(500).json(error)
  }
}
