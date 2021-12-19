import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get_user } from "../../redux/reducers/user";
import { roles } from "quizy-yk-common";
import { get_header } from "../../redux/reducers/header";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function AppNavBar() {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch({ type: "log-out" });
  const navigate = useNavigate();
  const header = useSelector(get_header);
  const user = useSelector(get_user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
          {header || "Quizy"}
        </Typography>
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setMenuOpen(true);
          }}
        >
          <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => {
            setAnchorEl(null);
            setMenuOpen(false);
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavBar;
