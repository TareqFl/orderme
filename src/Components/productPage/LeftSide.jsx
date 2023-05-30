import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";

const LeftSide = ({ data }) => {
  const [mainDP, setMainDP] = useState(null);

  // Handlers

  function handleClick(value) {
    setMainDP(value);
  }

  return (
    <Box
      sx={{
        width: {
          xs: "50%",
          sm: "40%",
          md: "50%",
        },
      }}
    >
      {/* Main Dp */}
      <Paper
        elevation={2}
        sx={{
          mb: 2,
          width: {
            xs: "100%",
            sm: "75%",
            lg: "100%",
          },
          height: {
            xs: "150px",
            sm: "200px",
            md: "325px",
            lg: "600px",
          },
          img: {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <img
          src={mainDP === null ? data.thumbnail : data.images[mainDP]}
          alt="khara"
        />
      </Paper>
      {/* Dp List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          gap: {
            xs: 0,
            sm: 12,
          },
          overflowX: "auto",
          width: "100%",
          height: {
            xs: "50px",
            sm: "100px",
            md: "150px",
          },
        }}
      >
        {data.images.map((img, indx) => {
          return (
            <Button
              key={indx}
              sx={{
                padding: 0,
                height: "100%",
                img: {
                  width: {
                    xs: "50px",
                    sm: "100px",
                    md: "150px",
                  },
                  height: "100%",
                  objectFit: "fill",
                },
              }}
              onClick={() => handleClick(indx)}
            >
              <img src={img} alt="khara" />
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default LeftSide;
