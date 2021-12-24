const User = require("../model/user.js");

// function for getting user profile
const getProfile = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const queryResult = await User.findOne({ "tokens.token": token });

    res.json({ data: queryResult });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfile };
