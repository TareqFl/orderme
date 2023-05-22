import * as React from "react";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { snackBar } from "../Actions";
export default function PositionedSnackbar() {
  const dispatch = useDispatch();
  const { Flash_Message } = useSelector((state) => state);
  const {
    open,
    //  message
  } = Flash_Message;

  const positions = { vertical: "top", horizontal: "center" };
  const { vertical, horizontal } = positions;

  const handleClose = () => {
    return dispatch(snackBar({ open: false }));
  };

  return (
    <div>
      {/* {buttons} */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={"Welcome"}
        key={vertical + horizontal}
        autoHideDuration={1000}
      />
    </div>
  );
}
