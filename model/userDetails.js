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
    image: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userDetail", UserDetailsSchema);
