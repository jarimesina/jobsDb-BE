const User = require("../model/user.js");
const fs = require("fs");
const path = require("path");

// function for getting user profile
const getProfile = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const queryResult = await User.findById(userId).exec();
    res.json({ data: queryResult });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfile };
