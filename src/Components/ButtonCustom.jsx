import { Badge, Box, ClickAwayListener, IconButton } from "@mui/material";
import React from "react";

const ButtonCustom = ({
  icon,
  badgeContent,
  height,
  width,
  children,
  click,
}) => {
  // color="action" fontSize='medium'
  const [open, setOpen] = React.useState(false);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
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
            backgroundColor: "white",
            right: 0,
            overflowY: "auto",
            overflowX: "hidden",
            transition: "height .5s",
            zIndex: 10,
          }}
        >
          {children}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default ButtonCustom;
