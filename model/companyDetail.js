const mongoose = require("mongoose");

const CompanyDetailsSchema = new mongoose.Schema({
  company_name: { type: String, default: null },
  about: { type: String, default: null },
  industry: { type: String, default: null },
  benefits: { type: String, default: null },
  image: { type: String, default: null },
});

const CompanyDetail = mongoose.model("companyDetail", CompanyDetailsSchema);

module.exports = CompanyDetail;
