import React from "react";
import { LoadingButton } from "@mui/lab";

export default function LoadingBtn({
  btnText,
  loadingTxt,
  pos,
  startIcon,
  endIcon,
  fullWidth
}) {
  return (
    <LoadingButton
      loading
      loadingIndicator={loadingTxt}
      loadingPosition={pos}
      endIcon={endIcon}
      startIcon={startIcon}
      variant="contained"
      fullWidth={fullWidth}
    >
      {btnText}
    </LoadingButton>
  );
}