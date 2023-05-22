import { KeyboardArrowDown, List } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  navigation,
  open_Buyer_pro,
  open_category,
  open_modal,
  category_type,
} from "../Actions";
import MyButton from "./MyButton";
import { cats } from "../fakeData";
const CategoryBar = () => {
  const dispatch = useDispatch();
  const { Authentication, Paper_view, Products } = useSelector(
    (state) => state
  );
  const { category } = Paper_view;
  const { auth } = Authentication;

  React.useEffect(() => {}, []);

  return (
    <Box
      sx={{
        backgroundColor: "#ffff",
        border: "0.05rem solid gray",
        borderTop: "none",
      }}
    >
      <Container
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        maxWidth="off"
      >
        <Box
          sx={{
            display: "flex",
            padding: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            gap: 4,
          }}
        >
          {/* Category Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <List />
            <Typography>Categories</Typography>
            {/* <CustomButton icon={<KeyboardArrowDown />} /> */}
            <MyButton
              icon={
                <KeyboardArrowDown
                  sx={{
                    transform: category && "rotate(180deg)",
                    transition: ".5s",
                  }}
                />
              }
              height={300}
              width={150}
              open={category}
              click={() => {
                if (category) {
                  return dispatch(open_category(false));
                }
                return dispatch(open_category(true));
              }}
              close_function={() => dispatch(open_category(false))}
            >
              <Paper
                sx={{
                  width: "90%",
                  height: "90%",
                  display: "flex",
                  overflowY: "auto",
                  flexDirection: "column",
                  gap: 2,
                  button: {
                    fontSize: "0.7rem",
                  },
                  borderRadius: 4,
                }}
              >
                <Button
                  color="black_"
                  variant="text"
                  onClick={() => {
                    dispatch(navigation({ page: "home", data: Products }));
                    dispatch(category_type(Products));
                    return dispatch(open_category(false));
                  }}
                >
                  All
                </Button>
                {cats.map((cat, indx) => {
                  const { label } = cat;
                  return (
                    <Button
                      key={indx}
                      color="black_"
                      variant="text"
                      onClick={() => {
                        const cat_arr = Products.filter(
                          (product) => product.category === label
                        );

                        dispatch(navigation({ page: "home", data: cat_arr }));
                        dispatch(category_type(cat_arr));
                        return dispatch(open_category(false));
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Paper>
            </MyButton>
          </Box>

          <Divider orientation="vertical" flexItem />
          <Button
            variant="text"
            sx={{ color: "black" }}
            onClick={() => {
              if (!auth) return dispatch(open_modal(true));
              return dispatch(navigation({ page: "sell", data: null }));
            }}
          >
            Sell on orderme
          </Button>
          <Button variant="text" sx={{ color: "black" }}>
            Help
          </Button>
          <Button
            variant="text"
            sx={{ color: "black" }}
            onClick={() => {
              dispatch(open_Buyer_pro(true));
            }}
          >
            Buyer's Protection
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryBar;
