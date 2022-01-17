const Job = require("../model/job");
const moment = require("moment");

const fetchCreatedJobs = async (req, res, next) => {
  try {
    const id = req.query.id;

    const queryResult = await Job.find({ owner: id });

    res.json({ data: queryResult });
  } catch (err) {
    console.log(err);
  }
};

// newJob function for post job route
const newJob = async (req, res, next) => {
  const {
    companyName,
    title,
    responsibilities,
    requirements,
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
    requirements,
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

  res.json({ message: "POST new job" });
};

const fetchJobs = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.programmingLanguage) {
      query.languages = req.query.programmingLanguage;
    }

    if (req.query.dateRange) {
      if (req.query.dateRange === "today") {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();

        query.dateCreated = { $gte: date };
      } else if (req.query.dateRange === "pastWeek") {
        const startOfWeek = moment().clone().startOf("week");
        const endOfWeek = moment().clone().endOf("week");

        query.dateCreated = {
          $gte: new Date(startOfWeek.toLocaleString()),
          $lte: new Date(endOfWeek.toLocaleString()),
        };
      } else if (req.query.dateRange === "pastMonth") {
        const startOfMonth = moment().clone().startOf("month");
        const endOfMonth = moment().clone().endOf("month");

        query.dateCreated = {
          $gte: new Date(startOfMonth.toLocaleString()),
          $lte: new Date(endOfMonth.toLocaleString()),
        };
      }
    }

    const queryResult = await Job.find(query)
      .populate({
        path: "owner",
        populate: {
          path: "info",
          model: "companyDetail",
        },
      })
      .skip(req.query.skip ? parseInt(req.query.skip) : 0)
      .limit(req.query.limit ? parseInt(req.query.limit) : 10);
    const total = await Job.find(query).count();
    res.json({ data: { jobs: queryResult, total: total } });
  } catch (err) {
    console.log(err);
  }
};

const editJob = async (req, res, next) => {
  try {
    // format data here
    const {
      _id,
      companyName,
      title,
      responsibilities,
      location,
      numberOfEmployees,
      // languages,
      // image,
    } = req.body;

    const query = { _id };

    await Job.findOneAndUpdate(
      query,
      {
        companyName,
        title,
        responsibilities,
        location,
        numberOfEmployees,
      },
      (err, data) => {
        if (err) {
          res.json({ status: "500", message: "Error in updating job." });
        } else {
          res.json({
            status: "200",
            message: "Successfully updated the job!",
            data,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    // format data here
    const {
      _id,
      companyName,
      title,
      responsibilities,
      location,
      numberOfEmployees,
      // languages,
      // image,
    } = req.body;

    const query = { _id };

    await Job.findOneAndDelete(
      query,
      {
        companyName,
        title,
        responsibilities,
        location,
        numberOfEmployees,
      },
      (err, data) => {
        if (err) {
          res.json({ status: "500", message: "Error in deleting job." });
        } else {
          res.json({
            status: "200",
            message: "Successfully deleted the job!",
            data,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { newJob, fetchCreatedJobs, fetchJobs, editJob, deleteJob };
