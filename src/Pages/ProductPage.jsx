import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSide from "../Components/productPage/LeftSide";
import RightSide from "../Components/productPage/RightSide";
import Card from "../Components/Card";
import { navigation } from "../Actions";
import CommentsSection from "../Components/CommentsSection";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { Navigation, Products } = useSelector((state) => state);
  const { data } = Navigation;
  let similar_products = Products.filter((p) => p.category === data.category);
  // Handlers
  function handleNavigation(value) {
    dispatch(
      navigation({
        page: "product_page",
        data: value,
      })
    );
  }

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: {
            xs: "50px",
            md: "65px",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: {
              sm: "2rem",
            },
          }}
        >
          {data.description}
        </Typography>
        {/* Product Display & Information */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: {
              xs: 2,
              sm: 1,
            },
            position: "relative",
          }}
        >
          <LeftSide data={data} />
          <RightSide data={data} />
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: {
              xs: 0,
              sm: 10,
            },
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1rem",
                sm: "2rem",
              },
            }}
          >
            Similar Products
          </Typography>
          <Stack
            display="flex"
            direction="row"
            alignItems="baseline"
            sx={{
              overflowX: "auto",
              justifyContent: "start",
              gap: 4,
            }}
          >
            {similar_products.map((itm, indx) => {
              if (itm !== data) {
                return (
                  <Card
                    key={indx}
                    item={itm}
                    index={indx}
                    width={200}
                    fnc={handleNavigation}
                  />
                );
              }
              return <></>;
            })}
          </Stack>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",
              sm: "2rem",
            },
            alignSelf: "start",
            mt: 2,
          }}
        >
          Customer Reviews
        </Typography>
        {/* Comment section & rate*/}
        <CommentsSection />
      </Box>
    </Container>
  );
};

export default ProductPage;
