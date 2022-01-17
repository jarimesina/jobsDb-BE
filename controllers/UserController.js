const CompanyDetail = require("../model/companyDetail");
const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function for getting user profile
const getProfile = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const queryResult = await User.findOne({ "tokens.token": token }).populate({
      path: "info",
      model: "companyDetail",
    });

    res.json({ data: queryResult });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      id,
      company_name,
      about,
      benefits,
      image,
      industry,
      numberOfEmployees,
    } = req.body;

    const query = { _id: id };

    const user = await User.findOne(query);

    const temp = user.info;
    await CompanyDetail.findOneAndUpdate(
      { _id: temp },
      {
        company_name,
        about,
        benefits,
        image,
        industry,
        numberOfEmployees,
      },
      (err, data) => {
        if (err) {
          res.json({ status: "500", message: "Error in updating job." });
        } else {
          console.log("success");
          res.json({
            status: "200",
            message: "Successfully updated the job!",
            data,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const registerUser = async (req, res) => {
  try {
    // Get user input
    const { firstName, lastName, email, password, isEmployer } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const company = await CompanyDetail.create({});

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      info: company._id,
      infoModel: isEmployer ? "companyDetail" : "userDetail",
      role: isEmployer ? 1 : 2, // 1 for normal user/employee and 2 for company/employer
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
    // save user token
    // user.tokens = user.tokens.concat({ token });
    // await user.save();

    // redirect
    res.status(201).json({ redirect: "/" });
  } catch (err) {
    console.log(err);
    res.status(201).json({ redirect: "/login" });
  }
};

module.exports = { getProfile, registerUser, updateUser };
