import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigation, view_item } from "../Actions";
import { Box, Button, Container, Typography } from "@mui/material";
import { getStoreProduct } from "../helpers/getStoreProducts";
import DataTable from "../Components/DataTable";
import Newitem from "../Components/SellPageComps/Newitem";
import UpdateItem from "../Components/SellPageComps/UpdateItem";
import { show_store_products } from "../Actions";
import { toaster_error } from "../Actions";
const Sell = () => {
  const dispatch = useDispatch();
  const { Authentication, Item_view, Store_Products } = useSelector(
    (state) => state
  );
  const { auth } = Authentication;

  React.useEffect(() => {
    if (!auth) dispatch(navigation({ page: "home", data: null }));
    getStoreProduct().then((data) =>
      dispatch(show_store_products(data.products)).catch((err) =>
        dispatch(toaster_error(err.message))
      )
    );
    //eslint-disable-next-line
  }, [auth, Item_view]);

  return (
    <Container maxWidth="md" sx={{ pt: 5 }}>
      <DataTable rows={Store_Products} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Button
          variant="contained"
          color="orange_"
          sx={{ color: "white", mt: 4 }}
          onClick={() => dispatch(view_item(null))}
        >
          New item
        </Button>
        <Typography>Edit Mode: {Item_view ? "ON" : "OFF"}</Typography>
      </Box>
      {!Item_view ? <Newitem /> : <UpdateItem />}
    </Container>
  );
};

export default Sell;
