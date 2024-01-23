import { Description, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import AvatarWithMenu from "../partials/Avatar";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#eceff1",
    },
  },
});

export default function EditorNav({ id, docId, handleOpen }) {
  const [input, setInput] = useState(false);
  const formik = useFormik({
    initialValues: {
      docName: "Untitled Document",
    },
    onSubmit: handleSubmit,
  });

  async function handleSubmit() {
    setInput(!input);
    if (formik.values.docName.length === 0) {
      formik.values.docName = "Untitled Document";
      return;
    }
    const formdata = new FormData();
    formdata.append("docName", formik.values.docName);
    await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_BACKEND_URL}/user/${id}/document/${docId}`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Description sx={{ fontSize: 40, color: "#0091ea", mr: 1 }} />
            {input ? (
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  name="docName"
                  size="small"
                  value={formik.values.docName}
                  onChange={formik.handleChange}
                  onFocus={(event) => event.target.select()}
                />
              </Box>
            ) : (
              <Typography
                sx={{ cursor: "pointer" }}
                component="div"
                onClick={() => setInput(!input)}
              >
                {formik.values.docName}
              </Typography>
            )}
            <Box ml="auto">
              <Button
                variant="contained"
                color="info"
                endIcon={<Send />}
                sx={{ mr: 2, borderRadius: 10 }}
                onClick={handleOpen}
              >
                Share
              </Button>
              <AvatarWithMenu />
            </Box>
          </Toolbar>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
