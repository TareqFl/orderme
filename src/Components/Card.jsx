import { ShoppingCartOutlined, StarRateRounded } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../Actions";
import CartHandler from "../helpers/CartHandler";
const Card = ({ item, fnc, index, width }) => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state);

  //handlers
  function addCart() {
    const helper = new CartHandler();
    helper.all_items = Cart;
    helper.item = item;
    helper.captured_item = Cart[index];
    helper.execute();
    return dispatch(add_to_cart([...helper.all_items]));
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 0.5,
        width,
        img: {
          width,
        },
      }}
    >
      <Button
        color="secondary"
        variant="contained"
        sx={{
          height: "150px",
          maxHeight: "150px",
          overflow: "hidden",
          padding: 0,
          img: {
            height: "100%",
            aspectRatio: {
              xs: 0.8,
              sm: 0,
            },
            objectFit: {
              xs: "fill",
              sm: "fill",
            },
          },
        }}
        onClick={() => fnc(item)}
      >
        <img loading="lazy" src={item.thumbnail} alt={index} />
      </Button>
      <Typography fontWeight={"bold"} letterSpacing={"1px"}>
        ${item.price}
      </Typography>
      <Typography textAlign="center">{item.title.substring(0, 10)}</Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          padding: 0.5,
        }}
      >
        <Paper
          sx={{
            display: "flex",
            backgroundColor: "#ffc001",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            borderRadius: "12px",
            padding: 0.5,
          }}
        >
          <StarRateRounded color="secondary" sx={{ fontSize: "medium" }} />
          <Typography
            color={"#fff"}
            fontWeight={"bold"}
            sx={{
              fontSize: {
                xs: "0.8rem",
              },
            }}
          >
            {item.rating}
          </Typography>
        </Paper>
        <Stack
          flexDirection="row"
          alignItems={"center"}
          gap={0.5}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <Typography>Sold</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>{Math.floor(Math.random() * 100)}</Typography>
        </Stack>
        <IconButton
          sx={{
            bgcolor: "#fe6e00",
            padding: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={addCart}
        >
          <ShoppingCartOutlined
            sx={{
              fill: "white",
              fontSize: {
                xs: "1.3rem",
              },
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default Card;
