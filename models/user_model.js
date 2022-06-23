const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //   _id: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  username: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods = {
  authenticate: function (plainPassword) {
    return plainPassword === this.password;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
