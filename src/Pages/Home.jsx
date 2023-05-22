import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { ShoppingCartOutlined, StarRateRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  category_type,
  get_all_products,
  navigation,
} from "../Actions";
import { BeatLoader } from "react-spinners";

import CartHandler from "../helpers/CartHandler";

const Home = () => {
  const dispatch = useDispatch();

  const { Cart, Products, Category } = useSelector((state) => state);

  const Renderloader = () => {
    useEffect(() => {
      const time = setTimeout(() => {
        dispatch(get_all_products());
        dispatch(category_type(Products));
        dispatch(
          navigation({
            page: "home",
            data: Products,
          })
        );
      }, 350);

      return () => clearTimeout(time);
    }, []);

    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader color="#fe6e00" size={8} />
      </Box>
    );
  };

  // eslint-disable next-line
  if (Category === null) return <Renderloader />;

  return (
    <Paper sx={{ height: "100%", backgroundColor: "#f5f5f5" }} elevation={0}>
      <Container maxWidth="xl">
        <Grid container>
          {Category?.map((item, index) => {
            return (
              <Grid
                xs={6}
                sm={3}
                lg={2}
                key={index}
                item
                sx={{ padding: 0.5, mb: 1, mt: 1 }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0.5,
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
                    onClick={() =>
                      dispatch(
                        navigation({
                          page: "product_page",
                          data: item,
                        })
                      )
                    }
                  >
                    <img loading="lazy" src={item.thumbnail} alt={index} />
                  </Button>
                  <Typography fontWeight={"bold"} letterSpacing={"1px"}>
                    ${item.price}
                  </Typography>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: {
                        xs: "0.8rem",
                        lg: "1rem",
                      },
                    }}
                  >
                    {item.title.substring(0, 15)}
                  </Typography>
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
                      <StarRateRounded
                        color="secondary"
                        sx={{ fontSize: "medium" }}
                      />
                      <Typography
                        color={"#fff"}
                        fontWeight={"bold"}
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            lg: "0.8rem",
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
                      <Typography
                        sx={{
                          fontSize: {
                            sm: "0.8rem",
                            lg: "1rem",
                          },
                        }}
                      >
                        Sold
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography
                        sx={{
                          fontSize: {
                            sm: "0.8rem",
                            lg: "1rem",
                          },
                        }}
                      >
                        {Math.floor(Math.random() * 100)}
                      </Typography>
                    </Stack>
                    <IconButton
                      sx={{
                        bgcolor: "#fe6e00",
                        padding: 0.5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        const helper = new CartHandler();
                        helper.all_items = Cart;
                        helper.item = item;
                        helper.captured_item = Cart[index];
                        helper.execute();
                        dispatch(add_to_cart([...helper.all_items]));
                      }}
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
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Paper>
  );
};

export default Home;
