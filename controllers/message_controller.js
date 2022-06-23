const { handleError, handleSuccess } = require("../utils/handleResponse");
const Message = require("../models/message_model");

exports.createMessage = (req, res) => {
  const message = new Message({ ...req.body });

  message.save().then((newMessage) => {
    if (!newMessage) handleError(res, "Error sending message");

    return res.json(newMessage);
  });
};

exports.getAllMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) return handleError(res, "Error retriveing messages", 400);

    if (!messages) return handleError(res, "No messages!", 400);

    return res.json({ messages });
  });
};
