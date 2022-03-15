const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // companyName: { type: String, default: null },
    title: { type: String, default: null },
    responsibilities: { type: String, default: null },
    requirements: { type: String, default: null },
    location: { type: String, default: null },
    // numberOfEmployees: { type: String, default: null },
    languages: { type: [String], default: null },
    image: { type: String, default: null },
    // TODO: change this to timestamps true and remove dateCreated
    dateCreated: { type: Date, default: new Date() },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    applicants: [
      { type: mongoose.Schema.Types.ObjectId, required: false, ref: "user" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
