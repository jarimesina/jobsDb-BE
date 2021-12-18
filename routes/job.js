const express = require("express"); //import express

const router = express.Router();

const jobController = require("../controllers/JobsControllers");
const auth = require("../middleware/auth");

router.get("/jobs", jobController.fetchJobs);
router.post("/job", auth, jobController.newJob);

module.exports = router; // export to use in server.js
