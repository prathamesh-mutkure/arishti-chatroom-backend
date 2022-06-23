const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  createMessage,
  getAllMessages,
} = require("../controllers/message_controller");

const router = express.Router();

router.post("/message/send", createMessage);

router.get("/messages/all", getAllMessages);

module.exports = router;
