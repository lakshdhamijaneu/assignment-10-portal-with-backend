import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { jobPosts } from "../data/jobPosts";

const JobListings = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>

      <Grid container spacing={3}>
        {jobPosts.map((job) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={job.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {job.lastUpdated}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

export default JobListings;
