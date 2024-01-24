import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../state/auth.js";
import { useNavigate } from "react-router-dom";

export default function AvatarWithMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logout());
    navigate("/auth/signin");
  };
  return (
    <>
      <IconButton
        edge="end"
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
        sx={{ mr: 2 }}
      >
        <AccountCircle sx={{ height: 44, width: 44, color: "#78909c" }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: "40px", padding: 5 }}
      >
        <MenuList sx={{ width: 200 }}>
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar sx={{ mr: 1 }} /> My Account
          </MenuItem>
          <Divider />
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">Logout</Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
