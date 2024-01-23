import { Description } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
  ThemeProvider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarWithMenu from "./Avatar";

export default function Navbar() {
  const navigate = useNavigate();
  const tab = useMediaQuery("(max-width:1000px)");
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#eceff1",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ width: "100vw" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Description
              sx={{
                display: {
                  xs: tab ? "flex" : "none",
                  md: tab ? "none" : "flex",
                },
                fontSize: 40,
                color: "#0091ea",
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              component="div"
              noWrap
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: {
                  xs: tab ? "flex" : "none",
                  md: tab ? "none" : "flex",
                },
                fontWeight: 500,
                fontSize: 20,
                color: "#607d8b",
                flexGrow: 1,
                cursor: "pointer",
              }}
            >
              Docs
            </Typography>
            <Box>
              <AvatarWithMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
