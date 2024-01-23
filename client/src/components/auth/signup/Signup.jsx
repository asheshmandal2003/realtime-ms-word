import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../../partials/FlexCenter";
import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import {useDispatch} from "react-redux"
import { login } from "../../../state/auth";

export default function Signup() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");
  const [registering, setRegistering] = useState(false);
  const dispatch = useDispatch()

  const signup = async (values) => {
    setRegistering(true);
    const formdata = new FormData()
    for(let value in values) formdata.append(value, values[value])
    await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        data: formdata,
        headers: {
          "Content-Type": "application/json"
        },
      })
    .then((result) => {
      dispatch(login({user: result.data.user}))
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
      navigate("/");
    })
    .catch((err) => {
      setRegistering(false);
      toast.error(`${err.response.data}`, {
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
    <FlexCenter>
      <Card
        sx={{
          p: phone ? 0 : 5,
          pt: phone ? 3 : 5,
          pb: phone ? 4 : 5,
          mt: phone ? 5 : 6,
          mb: phone ? 5 : 6,
          width: phone ? "90%" : 450,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={4} fontWeight={600}>
          Sign Up
        </Typography>
        <Form
          phone={phone}
          registering={registering}
          signup={signup}
        />
        <Typography mt={5}>
          Already have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/auth/signin")}
          >
            Sign in
          </Typography>
        </Typography>
      </Card>
    </FlexCenter>
  );
}