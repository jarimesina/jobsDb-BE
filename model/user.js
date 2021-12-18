const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

userSchema.virtual("jobs", {
  ref: "job",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("user", userSchema);
