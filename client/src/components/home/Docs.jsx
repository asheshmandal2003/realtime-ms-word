import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Docs({ docId, icon, text, display, onClick, setDocs }) {
  const [anchor, setAnchor] = useState(null);
  const id = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  async function getDocs() {
    await axios({
      method: "GET",
      url: `${import.meta.env.VITE_BACKEND_URL}/user/${id}/document`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => setDocs(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Error while fetching your documents!", {
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
  }

  const deleteDoc = async (docId) => {
    await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BACKEND_URL}/user/${id}/document/${docId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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
        getDocs();
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
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
    <FlexCenter flexDirection="column" alignItems="center">
      <Card
        sx={{
          height: 250,
          width: "100%",
          cursor: "pointer",
        }}
      >
        <CardHeader
          action={
            <Box display={display}>
              <IconButton onClick={handleClick} aria-controls="doc-options">
                <MoreVert />
              </IconButton>
              <Menu
                id="doc-options"
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
              >
                <MenuList sx={{ width: 170 }}>
                  <MenuItem onClick={() => navigate(`/document/${docId}`)}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText onClick={handleClose}>Edit</ListItemText>
                  </MenuItem>
                  <Divider/>
                  <MenuItem onClick={() => deleteDoc(docId)}>
                    <ListItemIcon>
                      <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText onClick={handleClose}>
                      <Typography color="error">Delete</Typography>
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          }
        />
        <Box
          component="div"
          onClick={onClick}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Card>
      <Typography mt={2}>{text}</Typography>
    </FlexCenter>
  );
}
