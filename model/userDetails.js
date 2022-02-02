const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    saved_jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userDetail", UserDetailsSchema);
