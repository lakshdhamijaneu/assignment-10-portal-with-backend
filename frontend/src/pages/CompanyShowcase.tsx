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
import { axiosClient } from "../api/axiosClient";

interface Job {
  _id: string;
  companyName: string;
  jobTitle: string;
  description: string;
  salary: number;
}

const CompanyShowcase = () => {
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
        setError("Failed to load job listings");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading)
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Company Showcase
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{job.jobTitle}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {job.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Salary: ${job.salary}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small" variant="contained" fullWidth>
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyShowcase;
