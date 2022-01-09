const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  // TODO: remove companyName, move numberofEmployees to company details, add requirements
  companyName: { type: String, default: null },
  title: { type: String, default: null },
  responsibilities: { type: String, default: null },
  location: { type: String, default: null },
  numberOfEmployees: { type: String, default: null },
  languages: { type: Array, default: null },
  image: { type: String, default: null },
  dateCreated: { type: String, default: new Date() },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model("job", jobSchema);
