const express = require ('express');
const router = express.Router();

const {createMessage , getMessages} = require("../controllers/MessageController");

router.post("/",createMessage);
router.get("/:chatId", getMessages);

module.exports = router;