const express = require("express");
const { check, validationResult } = require("express-validator");
const { isSignedIn } = require("../controllers/auth_controller");
const {
  createMessage,
  getAllMessages,
} = require("../controllers/message_controller");

const router = express.Router();

router.post("/message/send", isSignedIn, createMessage);

router.get("/messages/all", isSignedIn, getAllMessages);

module.exports = router;
