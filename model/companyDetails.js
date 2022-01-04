const mongoose = require("mongoose");

const CompanyDetailsSchema = new mongoose.Schema({
  company_name: { type: String, default: null },
  about: { type: String, default: null },
});

module.exports = CompanyDetailsSchema;