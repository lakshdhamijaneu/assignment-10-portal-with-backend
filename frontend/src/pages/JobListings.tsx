import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { axiosClient } from "../api/axiosClient";

interface Job {
  _id: string;
  companyName: string;
  jobTitle: string;
  description: string;
  salary: number;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data } = await axiosClient.get("/jobs");
        setJobs(data.jobs);
      } catch (err) {
        console.error(err);
        setError("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {job.jobTitle}
                </Typography>

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {job.companyName}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Salary: ${job.salary.toLocaleString()}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" endIcon={<OpenInNewIcon />} disabled>
                  Apply (Not implemented)
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {jobs.length === 0 && (
          <Typography sx={{ mt: 2 }}>No job postings available.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default JobListings;
