import { Box, Typography } from "@mui/material";
import React from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";

const CommentsSection = () => {
  const [comments, setComments] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [stars, setStars] = React.useState({
    star1: null,
    star2: null,
    star3: null,
    star4: null,
    star5: null,
  });

  const { Navigation } = useSelector((state) => state);
  const { data } = Navigation;
  React.useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=7")
      .then((response) => response.json())
      .then((data) => setComments(data.posts))
      .catch((err) => alert(err.message));

    fetch("https://dummyjson.com/users?limit=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((err) => alert(err.message));

    setStars((prev) => {
      return {
        star1: Math.round(Math.random() * 100),
        star2: Math.round(Math.random() * 100),
        star3: Math.round(Math.random() * 100),
        star4: Math.round(Math.random() * 100),
        star5: Math.round(Math.random() * 100),
      };
    });
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: {
          xs: 0.5,
          sm: 1,
        },
        paddingTop: 2,
      }}
    >
      {/* Statistics */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "start",
          width: {
            xs: "150px",
            sm: "290px",
          },
        }}
      >
        {[1, 2, 3, 4, 5].map((rate, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: {
                  xs: 0.5,
                  sm: 1,
                },
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    sm: "1rem",
                  },
                }}
              >
                {rate} Stars
              </Typography>
              <Box
                id="bar"
                sx={{
                  width: {
                    xs: "40%",
                    sm: "65%",
                  },
                  border: "2px solid gray",
                  height: "16px",
                  borderRadius: "4px",
                  position: "relative",
                  "&": {
                    "::after": {
                      content: '""',
                      position: "absolute",
                      height: "100%",
                      backgroundColor: "#fe6e00",
                      width: stars[`star${rate}`] + "%",
                      transition: "0.75s",
                    },
                  },
                }}
              ></Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                }}
              >
                %{`${stars[`star${rate}`]}`}
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* Comments */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: {
            xs: "95%",
            sm: "75%",
          },
        }}
      >
        {comments?.map((cmnt, index) => (
          <Box key={index}>
            <Comment values={cmnt} users={users} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentsSection;
