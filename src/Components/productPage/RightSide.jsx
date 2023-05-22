import {
  LocalShippingOutlined,
  LockRounded,
  SecurityRounded,
  StarRounded,
  UndoRounded,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CartHandler from "../../helpers/CartHandler";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, navigation } from "../../Actions";

const RightSide = ({ data }) => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state);

  // id
  // title
  // description
  // price
  // discountPercentage
  // rating
  // stock
  // brand
  // category
  // thumbnail

  const lists = [
    "Sed sed nunc tincidunt, dapibus erat ac, dapibus lacus.",
    "Praesent et tortor feugiat, feugiat lacus ut, euismod augue.",
    "Quisque molestie augue eget justo consequat rhoncus.",
    "Pellentesque tempus enim ut enim dictum lobortis.",
    "Curabitur vel lorem interdum, pulvinar lectus imperdiet, ornare ipsum.",
    "Nunc ut ipsum a dui tincidunt tincidunt.",
    "Quisque vulputate lectus quis eros aliquet, vitae condimentum orci fermentum.",
    "Curabitur condimentum odio eget nulla feugiat, quis tempor justo hendrerit.",
  ];

  function RenderStars({ value }) {
    let stars = [];

    for (let i = 0; i < Math.round(value); i++) {
      stars.push(i);
    }

    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {stars.map((itm, indx) => {
          return (
            <StarRounded
              key={indx}
              sx={{
                color: "#ffc001",
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                },
              }}
            />
          );
        })}
        <Typography
          sx={{
            fontSize: {
              xs: "0.6rem",
              sm: "1rem",
            },
            fontWeight: "bold",
          }}
        >
          ({value} Ratings.)
        </Typography>
      </Box>
    );
  }

  function Rendericons({ icon, text }) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {icon}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "0.4rem",
              sm: "1rem",
            },
          }}
        >
          {text}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: {
          xs: "50vw",
          sm: "60%",
          md: "50%",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: {
          xs: 0.5,
          sm: 1,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
          },
          fontWeight: "bold",
        }}
      >
        Brand : {data.brand}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <RenderStars value={data.rating ? data.rating : 5} />
      </Box>
      <Typography
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
          },
        }}
      >
        {data.title}
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xs: "0.8rem",
            sm: "1rem",
          },
        }}
      >
        {data.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            sm: "start",
          },
          gap: {
            xs: 0.7,
            sm: 2,
          },
        }}
      >
        <Rendericons
          icon={
            <LocalShippingOutlined
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "2rem",
                },
              }}
            />
          }
          text={"Shipping"}
        />
        <Rendericons
          icon={
            <LockRounded
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "2rem",
                },
              }}
            />
          }
          text={"Safe Transaction"}
        />
        <Rendericons
          icon={
            <SecurityRounded
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "2rem",
                },
              }}
            />
          }
          text={"2 Year Warantee"}
        />
        <Rendericons
          icon={
            <UndoRounded
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "2rem",
                },
              }}
            />
          }
          text={"Return Policy"}
        />
      </Box>
      {/* Price and Buy Action */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "row",
            sm: "row",
          },
          alignItems: "center",
          gap: {
            xs: 1,
            sm: 2,
          },
          flexWrap: "wrap",
        }}
      >
        <Typography
          color="orange_"
          sx={{
            fontWeight: "bold",
            color: "tomato",
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
            },
            letterSpacing: {
              xs: "1px",
              sm: "2px",
            },
            alignSelf: "start",
          }}
        >
          ${data.price}
        </Typography>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: {
              xs: 0.5,
              sm: 1,
            },
          }}
        > */}
        <Button
          variant="contained"
          color="red_"
          sx={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: "2px",
            fontSize: {
              xs: "0.6rem",
              sm: "1.2rem",
            },
          }}
          onClick={() => {
            dispatch(add_to_cart([data]));
            dispatch(navigation({ page: "buy", data: null }));
          }}
        >
          Buy now
        </Button>
        <Button
          variant="contained"
          color="orange_"
          sx={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: "2px",
            fontSize: {
              xs: "0.5rem",
              sm: "1rem",
            },
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
          onClick={() => {
            const helper = new CartHandler();
            helper.all_items = Cart;
            helper.item = data;
            helper.captured_item = data;
            helper.execute();
            return dispatch(add_to_cart([...helper.all_items]));
          }}
        >
          add to cart
        </Button>
        {/* </Box> */}
      </Box>
      {/* About this Product */}
      <Box
        sx={{
          "& .li": {
            fontSize: {
              xs: "0.4rem",
              sm: "1rem",
            },
          },
          "& .abt": {
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",
              sm: "1.4rem",
            },
          },
          ul: {
            marginTop: {
              xs: 0,
              sm: 1,
            },
            pl: {
              xs: 1,
              sm: 4,
            },
          },
        }}
      >
        <Typography className="abt">About this product</Typography>
        <ul>
          {lists.map((it, indx) => {
            return (
              <li key={indx}>
                <Typography className="li">{it}</Typography>
              </li>
            );
          })}
        </ul>
      </Box>
      {/* Action */}
    </Box>
  );
};

export default RightSide;
