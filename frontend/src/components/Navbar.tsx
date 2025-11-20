import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Job Portal</Typography>

        <Stack direction="row" spacing={2}>
          {/* Always visible */}
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>

          {/* Protected pages — only show if logged in */}
          {user && (
            <>
              <Button component={Link} to="/about" color="inherit">
                About
              </Button>

              {/* EMPLOYEE ONLY */}
              {user.type === "employee" && (
                <Button component={Link} to="/jobs" color="inherit">
                  Jobs
                </Button>
              )}

              {/* ADMIN ONLY */}
              {user.type === "admin" && (
                <Button component={Link} to="/admin/create-job" color="inherit">
                  Create Job
                </Button>
              )}

              <Button component={Link} to="/companies" color="inherit">
                Companies
              </Button>

              <Button component={Link} to="/contact" color="inherit">
                Contact
              </Button>
            </>
          )}

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
