import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Job Portal
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
        Discover top job opportunities, explore companies, and manage your next
        career move.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" size="large" component={Link} to="/jobs">
          Browse Jobs
        </Button>

        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/companies"
        >
          Explore Companies
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
