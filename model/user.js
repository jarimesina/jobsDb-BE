const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  info: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: "onModel",
  },
  infoModel: {
    type: String,
    required: true,
    enum: ["companyDetail", "userDetail"],
  },
  role: { type: Number, required: true },
});

userSchema.virtual("jobs", {
  ref: "job",
  localField: "_id",
  foreignField: "owner",
});

module.exports = mongoose.model("user", userSchema);
