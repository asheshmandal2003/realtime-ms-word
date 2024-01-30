import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Editor from "./components/editor/Editor";
import Signup from "./components/auth/signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import Signin from "./components/auth/signin/Signin";
import { useSelector } from "react-redux";
import Profile from "./components/profile/Profile";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Box>
      <Routes>
        <Route
          path="/auth/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/signin"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/document/:documentId"
          element={user ? <Editor /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/auth/signin" />}
        />
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
