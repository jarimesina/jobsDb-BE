const express = require("express");

const router = express.Router();

const jobController = require("../controllers/JobsControllers");
const auth = require("../middleware/auth");

router.get("/jobs", jobController.fetchJobs);
// endpoint for getting jobs related to user id
router.get("/myJobs", jobController.fetchCreatedJobs);

router.post("/job", auth, jobController.newJob);

router.put("/job", auth, jobController.editJob);
router.delete("/job", auth, jobController.deleteJob);

router.post("/saveJob", jobController.addToSavedJobs);
router.post("/removeSavedJob", jobController.removeSavedJob);

router.post("/applyJob", jobController.applyJob);

module.exports = router; // export to use in server.js
