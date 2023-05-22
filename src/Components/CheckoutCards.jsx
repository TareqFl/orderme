import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../Actions";
// import { useSelector } from "react-redux";

const CheckoutCards = ({ product, index }) => {
  const dispatch = useDispatch();

  const { Cart } = useSelector((state) => state);

  const { title, thumbnail, quantity, price } = product;

  function handleRemove() {
    const all_products = Cart;
    const captured_product = all_products[index];
    if (captured_product.quantity === 1) {
      all_products.splice(index, 1);
      return dispatch(add_to_cart([...all_products]));
    }
    captured_product.quantity = captured_product.quantity - 1;
    return dispatch(add_to_cart([...all_products]));
  }
  function handleAddMore() {
    const all_products = Cart;
    const captured_product = all_products[index];
    captured_product.quantity = captured_product.quantity + 1;
    return dispatch(add_to_cart([...all_products]));
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Product Image */}
      <Paper
        elevation={2}
        sx={{
          width: 150,
          height: 100,
          img: {
            width: "100%",
            height: "100%",
          },
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <img src={thumbnail} alt={thumbnail} />
      </Paper>
      {/* Product info */}
      <Box
        sx={{
          width: 125,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          padding: 1,
        }}
      >
        <Typography sx={{ fontWeight: 900, alignSelf: "baseline" }}>
          {title.substring(0, 10)}
        </Typography>
        <Typography sx={{ color: "gray" }}>${price}</Typography>
      </Box>
      {/* Interaction buttons */}
      <Box
        sx={{
          width: 125,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: 2,
            svg: {
              fontSize: "1rem",
            },
          }}
          onClick={handleRemove}
        >
          <Remove />
        </IconButton>
        <Typography>{quantity}</Typography>
        <IconButton
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: 2,
            svg: {
              fontSize: "1rem",
            },
          }}
          onClick={handleAddMore}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CheckoutCards;
