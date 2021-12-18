const Job = require("../model/job");
const fs = require("fs");
const path = require("path");

// newJob function for post job route
const newJob = async (req, res, next) => {
  const {
    companyName,
    title,
    responsibilities,
    location,
    numberOfEmployees,
    languages,
    image,
    dateCreated,
  } = req.body;

  var job = new Job({
    companyName,
    title,
    responsibilities,
    location,
    numberOfEmployees,
    languages,
    image,
    dateCreated,
    owner: req.user.user_id,
  });

  // console.log("help me", await Job.findById(job._id));
  // job.save((err) => {
  //   if (err) return handleError(err);
  // });

  job.save();

  res.json({ message: "POST new job" }); // dummy function for now
};

const fetchJobs = async (req, res, next) => {
  try {
    const queryResult = await Job.find({});
    res.json({ data: queryResult });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { newJob, fetchJobs };
