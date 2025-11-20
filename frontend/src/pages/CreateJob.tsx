import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

import { axiosClient } from "../api/axiosClient";

const CreateJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axiosClient.post("/create/job", {
        companyName,
        jobTitle,
        description,
        salary: Number(salary),
      });

      setSuccess("Job created successfully!");
      setCompanyName("");
      setJobTitle("");
      setDescription("");
      setSalary("");
    } catch (err) {
      console.error(err);
      setError("Failed to create job.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Job
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Company Name"
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Job Title"
            margin="normal"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Job Description"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Salary"
            type="number"
            margin="normal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Create Job
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateJob;
