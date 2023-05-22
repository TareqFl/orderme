import { StarRounded } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Comment = ({ users, values }) => {
  const { userId, body } = values;

  const [user, setUser] = React.useState({});
  const { username, image } = user;
  React.useState(() => {
    users.forEach(
      (usr) =>
        usr.id === userId &&
        setUser({
          username: usr.username,
          image: usr.image,
        })
    );
  }, []);

  function RenderStars() {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarRounded
          sx={{
            color: "#ffc001",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
            },
          }}
        />
      );
    }

    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {stars.map((str, indx) => {
          return (
            <Box key={indx}>
              <StarRounded
                sx={{
                  color: "#ffc001",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                  },
                }}
              />
            </Box>
          );
        })}
        {/* <Typography
          sx={{
            fontSize: {
              xs: "0.6rem",
              sm: "1rem",
            },
            fontWeight: "bold",
          }}
        >
          ({value} Ratings.)
        </Typography> */}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%%" }}>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Avatar src={image} />
        <Typography>{username}</Typography>
        <RenderStars />
      </Stack>
      <Typography>{body}</Typography>
    </Box>
  );
};

export default Comment;
