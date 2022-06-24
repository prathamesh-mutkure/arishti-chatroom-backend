const { handleError, handleSuccess } = require("../utils/handleResponse");
const Message = require("../models/message_model");

exports.createMessage = (req, res) => {
  const message = new Message({ ...req.body });

  message.save().then((newMessage) => {
    if (!newMessage) handleError(res, "Error sending message");

    return res.json(newMessage);
  });
};

exports.saveMessageToDB = (from_id, from_username, text) => {
  const message = new Message({ from_id, from_username, text });

  message
    .save()
    .then((newMessage) => {
      if (!newMessage) {
        console.log("Could not save message to DB");
      }
    })
    .catch((err) => {
      console.log(`Error saving message: ${err}`);
    });
};

exports.getAllMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) return handleError(res, "Error retriveing messages", 400);

    if (!messages) return handleError(res, "No messages!", 400);

    const messagesFormatted = messages.map((message) => {
      const { _id, text, from_id, from_username, createdAt } = message;

      return { id: _id, text, from_id, from_username, createdAt };
    });

    return res.json({
      messages: messagesFormatted,
    });
  });
};
