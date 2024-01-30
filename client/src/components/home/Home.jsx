import { Box, Grid } from "@mui/material";
import Navbar from "../partials/Navbar";
import Docs from "./Docs";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";
import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [docs, setDocs] = useState([]);

  const createDoc = async () => {
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_URL}/user/${
        user._id
      }/document/create`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => navigate(`/document/${res.data._id}`))
      .catch((err) => {
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

  useEffect(() => {
    async function getDocs() {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_BACKEND_URL}/user/${user._id}/document`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => setDocs(res.data))
        .catch((err) => {
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
    getDocs();
  }, []);

  return (
    <Box width="100%" minHeight="100vh" bgcolor="#e0e0e0">
      <Navbar />
      <Grid container spacing={6} p={6} columns={{ xs: 1, sm: 12, md: 12 }}>
        <Grid item md={2} sm={4} xs={1} alignContent="center">
          <Docs
            icon={<AddIcon sx={{ fontSize: 50, color: "#555", mt: 9 }} />}
            text="Blank Document"
            onClick={createDoc}
            display="none"
          />
        </Grid>
        {docs.length > 0 &&
          docs.map((doc) => {
            return (
              <Grid key={doc._id} item md={2} sm={4} xs={1}>
                <Docs
                  docId={doc._id}
                  icon={
                    <Description
                      sx={{ fontSize: 50, mt: 5, color: "#0091ea" }}
                    />
                  }
                  text={`${doc.docName}`}
                  display="flex"
                  onClick={() => navigate(`/document/${doc._id}`)}
                  setDocs={setDocs}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
