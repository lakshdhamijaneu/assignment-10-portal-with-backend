const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("../controllers/job.controller");

// POST /create/job
router.post("/create/job", createJob);
router.get("/jobs", getJobs);

module.exports = router;
