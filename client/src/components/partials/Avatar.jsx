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
import { Delete, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/auth.js";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default function AvatarWithMenu() {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    setLoggingOut(true);
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        dispatch(logout());
        setLoggingOut(false);
        toast.success(`${result.data.message}`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((err) => {
        setLoggingOut(false);
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });

    navigate("/auth/signin");
  };

  const deleteAc = async () => {
    setLoggingOut(true);
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/auth/delete/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(logout());
        setLoggingOut(false);
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((err) => {
        setLoggingOut(false);
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      });
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
        <Avatar
          sx={{
            height: 44,
            width: 44,
            color: "#000",
            bgcolor: deepOrange[500],
          }}
        >
          {user.first_name.charAt(0)}
        </Avatar>
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
          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleClose();
            }}
          >
            <Avatar sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logOut} disabled={loggingOut}>
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText>
              {
                loggingOut?
                <Typography color="error">Logging out...</Typography>:
                <Typography color="error">Logout</Typography>
              }
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={deleteAc} disabled={loggingOut}>
            <ListItemIcon>
              <Delete color="error" />
            </ListItemIcon>
            <ListItemText>
              {
                loggingOut ?
                <Typography color="error">Deleting...</Typography>:
                <Typography color="error">Delete Account</Typography>
              }
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
