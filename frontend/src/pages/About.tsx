import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const About = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        About This Portal
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        This job portal was built as part of Assignment 9 to demonstrate:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="🔐 Secure login system with backend integration" />
        </ListItem>
        <ListItem>
          <ListItemText primary="🗂 Dynamic job listings rendered using React" />
        </ListItem>
        <ListItem>
          <ListItemText primary="🏢 Company showcase using images stored on the backend" />
        </ListItem>
        <ListItem>
          <ListItemText primary="📦 Axios-based communication with the server" />
        </ListItem>
        <ListItem>
          <ListItemText primary="🎨 Material UI for modern, responsive UI design" />
        </ListItem>
      </List>
    </Container>
  );
};

export default About;
