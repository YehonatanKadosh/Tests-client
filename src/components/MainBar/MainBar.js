import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function MainBar() {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch({ type: "log-out" });
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Queezy
        </Typography>
        <Button color="inherit" onClick={handleLogOut}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default MainBar;
