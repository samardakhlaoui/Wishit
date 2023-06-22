const ChatModel = require("../models/ChatModel");


//create chat
exports.createChat = async(req,res)=>{
    const {firstId,secondId}= req.body

    try{
        const chat= await ChatModel.findOne({
            members :{$all:[firstId,secondId]}
        })
        if(chat) return res.status(200).json(chat);

        const newChat = new ChatModel({
            members:[firstId,secondId]
        })
        const response = await newChat.save();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err)
    }
}

//create chat

//findUserChats
exports.findUserChats= async (req, res) =>{
    const userId = req.params.userId;
    
    try{
        const chats= await ChatModel.find({
            members:{$in : userId}
        })
        res.status(200).json(chats);
    }catch(err){
        res.status(500).json(err);
    }
}
//findUserChats

//find Chat
exports.findChat = async(req,res)=>{
    const {firstId,secondId}= req.params;
    
    try{
        const chat= await ChatModel.find({
            members:{$all : [firstId,secondId]},
        })
        res.status(200).json(chat);
    }catch(err){
        res.status(500).json(err);
    }
}
//find Chat
