import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get_actions } from "../../redux/reducers/actions";

function SideBar({ open, onClose }) {
  const actions = useSelector(get_actions);
  const navigate = useNavigate();

  const handleClick = (rout) => {
    if (rout) navigate(rout);
    onClose();
  };

  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      <List>
        {actions.map(({ name, rout, icon }) => (
          <ListItem onClick={() => handleClick(rout)} button key={name}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
