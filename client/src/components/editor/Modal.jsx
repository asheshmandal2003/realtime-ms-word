import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast, Bounce } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 460,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function ShareModal({ id, docId, open, handleClose }) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: shareDoc,
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email!")
        .required("Email is required!"),
    }),
  });

  async function shareDoc() {
    const formdata = new FormData();
    formdata.append("email", formik.values.email);
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
        console.log(res.data);
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
              Share "Untitled Document"
            </Typography>
            <TextField
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                Boolean(formik.touched.email) && Boolean(formik.errors.email)
              }
              helperText={Boolean(formik.touched.email) && formik.errors.email}
              placeholder="Enter email address"
              fullWidth
            />
            <Typography fontWeight={500}>People with access</Typography>
            <MenuList sx={{ width: 460 }}>
              <MenuItem>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>
                  asheshmandal73@gmail.com
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }}>
                  asheshmandal73@gmail.com
                </ListItemText>
              </MenuItem>
            </MenuList>
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
