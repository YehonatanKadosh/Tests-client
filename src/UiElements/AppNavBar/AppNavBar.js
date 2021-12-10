import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get_user } from "../../redux/reducers/user";
import { roles } from "quizy-yk-common";

function AppNavBar() {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch({ type: "log-out" });
  const navigate = useNavigate();
  const user = useSelector(get_user);

  return (
    <AppBar position="static">
      <Toolbar>
        {user.role === roles.Admin && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <Home />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          quizy
        </Typography>
        <Button color="inherit" onClick={handleLogOut}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavBar;
