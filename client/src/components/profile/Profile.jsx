import {
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Navbar from "../partials/Navbar";
import { useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import { FlexBetween } from "../partials/FlexBetween";

export default function Profile() {
  const phone = useMediaQuery("(max-width:600px)");
  const user = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <FlexCenter mt={5}>
        <Card sx={{ width: phone ? "76%" : 400, p: 4 }}>
          <FlexCenter alignItems="center" flexDirection="column">
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                height: phone ? 80 : 100,
                width: phone ? 80 : 100,
                fontSize: phone ? 30 : 40,
                mb: 6,
              }}
            >
              {user.first_name.charAt(0)}
            </Avatar>
            <Stack width="100%" spacing={3}>
              <FlexBetween>
                <Typography>Name</Typography>
                <Typography>{`${user.first_name} ${user.last_name}`}</Typography>
              </FlexBetween>
              <Divider />
              <FlexBetween>
                <Typography>Email</Typography>
                <Typography>{user.email}</Typography>
              </FlexBetween>
              <Divider />
            </Stack>
          </FlexCenter>
        </Card>
      </FlexCenter>
    </>
  );
}
