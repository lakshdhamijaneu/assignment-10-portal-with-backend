import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Job Portal</Typography>

        <Stack direction="row" spacing={2}>
          {/* NOT LOGGED IN */}
          {!user && (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}

          {/* EMPLOYEE NAV */}
          {user?.type === "employee" && (
            <>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/jobs" color="inherit">
                Jobs
              </Button>
              <Button component={Link} to="/contact" color="inherit">
                Contact
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {/* ADMIN NAV */}
          {user?.type === "admin" && (
            <>
              <Button component={Link} to="/admin/add-job" color="inherit">
                Add Job
              </Button>

              <Button component={Link} to="/admin/employees" color="inherit">
                Employees
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
