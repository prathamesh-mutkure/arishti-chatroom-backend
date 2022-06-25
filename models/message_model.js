const mongoose = require("mongoose");

const { ObjectId } = mongoose;

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    from_username: {
      type: String,
      required: true,
      trime: true,
      maxLength: 32,
    },
    from_id: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
