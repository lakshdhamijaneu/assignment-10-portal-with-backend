const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    if (!companyName || !jobTitle || !description || !salary) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const job = await Job.create({
      companyName,
      jobTitle,
      description,
      salary,
    });

    return res.status(201).json({ message: "Job created successfully.", job });
  } catch (err) {
    console.error("Error creating job:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json({ jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  createJob,
  getJobs,
};
