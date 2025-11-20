import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { axiosClient } from "../api/axiosClient";
import type { BackendUser, UsersResponse } from "../types";

const CompanyShowcase = () => {
  const [users, setUsers] = useState<BackendUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axiosClient.get<UsersResponse>("/getUser");
        console.log("data", data);
        setUsers(data.users);
      } catch (err) {
        console.error(err);
        setError("Failed to load company images");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
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
        Company Showcase
      </Typography>

      <Grid container spacing={3}>
        {users.map((u) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={u._id}>
            <Card>
              {u.imagePath ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000${u.imagePath}`}
                  alt={u.fullName}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/300x200.png?text=No+Image"
                  alt="No image"
                />
              )}

              <CardContent>
                <Typography variant="h6">{u.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CompanyShowcase;
