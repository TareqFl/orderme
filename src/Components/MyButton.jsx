import { Badge, Box, ClickAwayListener, IconButton } from "@mui/material";
import React from "react";

const MyButton = ({
  icon,
  badgeContent,
  height,
  width,
  children,
  click,
  close_function,
  open,
  top,
  right,
  left,
  bottom,
  styling,
}) => {
  return (
    <ClickAwayListener onClickAway={close_function}>
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{ padding: 0, backgroundColor: "white" }}
          onClick={click}
        >
          <Badge badgeContent={badgeContent} color="red_">
            {icon}
          </Badge>
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            height: open ? height : 0,
            width: open ? width : 0,
            backgroundColor: "transparent",
            top,
            right,
            left,
            bottom,
            overflowY: "auto",
            overflowX: "hidden",
            transition: "height .5s",
            zIndex: 10,
            ...styling,
          }}
        >
          {children}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default MyButton;
