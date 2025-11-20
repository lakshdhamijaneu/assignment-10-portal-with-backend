import { Container, Typography, Button, Box, Chip, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Home = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);

  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.fullName || "User"}!
        </Typography>

        <Chip
          label={role === "admin" ? "Admin" : "Employee"}
          color={role === "admin" ? "error" : "primary"}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
          Discover top job opportunities, explore companies, and manage your
          next career move.
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

          {role === "admin" && (
            <Button
              variant="contained"
              size="large"
              color="error"
              component={Link}
              to="/create-job"
            >
              Create Job
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
