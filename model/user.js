const mongoose = require("mongoose");
const UserDetailsSchema = require("./userDetails");
const CompanyDetailsSchema = require("./companyDetails");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  user_details: {type: UserDetailsSchema | CompanyDetailsSchema}
});

userSchema.virtual("jobs", {
  ref: "job",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("user", userSchema);
