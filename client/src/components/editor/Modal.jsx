import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast, Bounce } from "react-toastify";
import { Close} from "@mui/icons-material";
import { useState } from "react";
import { FlexBetween } from "../partials/FlexBetween";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 540,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function ShareModal({
  id,
  docId,
  docName,
  open,
  handleClose,
  accessList,
  getDocDetails,
}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      userAccessType: "editor",
    },
    onSubmit: shareDoc,
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email!")
        .required("Email is required!"),
    }),
  });

  const formik2 = useFormik({
    initialValues: {
      docAccessType: "private",
    },
    onSubmit: changeAccess,
  });

  async function changeAccess() {
    const formdata = new FormData();
    formdata.append("docAccessType", formik2.values.docAccessType);
    await axios({
      method: "PATCH",
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/user/${id}/document/${docId}/change-access`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getDocDetails();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
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

  async function shareDoc() {
    const formdata = new FormData();
    formdata.append("email", formik.values.email);
    formdata.append("userAccessType", formik.values.userAccessType);
    await axios({
      method: "POST",
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/user/${id}/document/${docId}/share`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getDocDetails();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
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

  async function removeAccess(userId) {
    await axios({
      method: "DELETE",
      url: `${
        import.meta.env.VITE_BACKEND_URL
      }/user/${id}/document/${docId}/people/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.success(`${res.data.message}`, {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getDocDetails();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-center",
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {`Share "${docName}"`}
            </Typography>
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={(event) => event.target.select()}
              error={
                Boolean(formik.touched.email) && Boolean(formik.errors.email)
              }
              helperText={Boolean(formik.touched.email) && formik.errors.email}
              placeholder="Enter email address"
              fullWidth
            />
            <FormControl>
              <InputLabel>User access type</InputLabel>
              <Select
                name="userAccessType"
                label="User access type"
                value={formik.values.userAccessType}
                onChange={formik.handleChange}
                size="small"
              >
                <MenuItem value="viewer">Viewer</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
              </Select>
            </FormControl>
            {accessList.length > 0 && (
              <>
                <Typography fontWeight={500}>People with access</Typography>
                <MenuList sx={{ maxHeight: 180, overflow: "scroll" }}>
                  {accessList.map((people) => {
                    return (
                      <MenuItem key={people.userId._id} sx={{ mb: 1 }}>
                        <ListItemIcon>
                          <Avatar />
                        </ListItemIcon>
                        <ListItemText sx={{ ml: 1 }}>
                          {people.userId.email}
                        </ListItemText>
                        {people.isOwner ? (
                          <Typography>owner</Typography>
                        ) : (
                         <FlexBetween alignItems="center">
                          <Typography mr={1}>{people.userAccessType}</Typography>
                          <IconButton onClick={()=>removeAccess(people.userId._id)} >
                            <Close fontSize="small" />
                          </IconButton>
                         </FlexBetween>
                        )}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </>
            )}
            <Typography fontWeight={500}>General access</Typography>
            <Box component="form">
              <FormControl>
                <InputLabel>Documnet access type</InputLabel>
                <Select
                  name="docAccessType"
                  label="Documnet access type"
                  value={formik2.values.docAccessType}
                  onChange={(event) => {
                    console.log(event.target.value);
                    formik2.setFieldValue("docAccessType", event.target.value);
                    formik2.handleSubmit();
                  }}
                  size="small"
                >
                  <MenuItem value="private">Restricted</MenuItem>
                  <MenuItem value="public">Anyone can view</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
