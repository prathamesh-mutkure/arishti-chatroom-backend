const { handleError, handleSuccess } = require("../utils/handleResponse");
const { check, validationResult } = require("express-validator");
const User = require("../models/user_model");

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return handleError(res, "Error retriveing the user", 400);

    if (!user) return handleError(res, "User doesn't exists", 400);

    if (password !== user.password)
      return handleError(res, "Incorrect username or password!", 401);

    return res.json({ id: user._id, username: user.username });
  });
};

exports.register = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return handleError(res, "Database error", 400);

    if (user) return handleError(res, "User already exists", 400);

    const newUser = User({ username, password });

    newUser.save().then((newUser) => {
      if (!newUser) return handleError(res, "Error registering user");

      return res.json({ id: newUser.id, username: newUser.username });
    });
  });
};
