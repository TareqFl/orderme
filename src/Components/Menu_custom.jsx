import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardArrowUp } from "@mui/icons-material";
import { handle_drawer } from "../Actions";

const CustomMenu = () => {
  const dispatch = useDispatch();
  const { Drawer } = useSelector((state) => state);
  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          sm: "none",
        },
        position: "absolute",
        top: 0,
        zIndex: 10,
        height: Drawer ? "50vh" : 0,
        width: "100%",
        backgroundColor: "whitesmoke",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflow: "hidden",
        paddingTop: Drawer && "10%",
        transition: "height 0.5s, width 0.35s, padding 0.5s",
      }}
    >
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Your Account</Typography>
      </Button>
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Notifications</Typography>
      </Button>
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Your Mail</Typography>
      </Button>
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Your Account</Typography>
      </Button>
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Sell on Orderme</Typography>
      </Button>
      <Button sx={{ width: "100%" }} color="orange_">
        <Typography>Settings</Typography>
      </Button>
      <Box sx={{ flexGrow: 1 }}></Box>
      {/* Drawer Button */}
      <Button
        variant="contained"
        color="orange_"
        onClick={() => dispatch(handle_drawer())}
      >
        <KeyboardArrowUp sx={{ margin: 0 }} color="primary" />
      </Button>
    </Box>
  );
};

export default CustomMenu;
