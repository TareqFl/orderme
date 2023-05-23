import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import {
  show_store_products,
  toaster_error,
  toaster_success,
  view_item,
} from "../Actions";
import { RemoveCircle, Visibility } from "@mui/icons-material";
import { getStoreProduct } from "../helpers/getStoreProducts";

const DataTable = ({ rows }) => {
  const dispatch = useDispatch();

  // handler
  async function handleDelete(value) {
    const response = await fetch(
      process.env.REACT_APP_DOMAIN_NAME + "/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );
    const data = await response.json();
    const { msg } = data;
    if (msg) {
      dispatch(toaster_success("Item succussfully deleted"));
      return getStoreProduct().then((data) =>
        dispatch(show_store_products(data.products))
      );
    }
    return dispatch(toaster_error("something went wrong please try again"));
  }

  // end of handler

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 70 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "brand", headerName: "Brand", width: 70 },
    { field: "category", headerName: "Category", width: 90 },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      sortable: false,
    },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      description: "This is the main display of the product",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const image = params.row.thumbnail;

        return (
          <Paper
            elevation={0}
            sx={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              img: { width: "50%" },
            }}
          >
            <img src={image} alt={params.row.id} />
          </Paper>
        );
      },
    },
    {
      field: "images",
      headerName: "Images",
      width: 70,
      renderCell: (params) => {
        return <Typography>{params.row.images.length}</Typography>;
      },
    },
    {
      headerName: "Action",
      description: "click on button to view and edit",
      sortable: false,
      filter: false,

      renderCell: (params) => {
        return (
          <Stack direction="row" width="100%">
            <IconButton
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => {
                const { row } = params;
                // const {
                //   id,
                //   title,
                //   price,
                //   brand,
                //   category,
                //   description,
                //   thumbnail,
                //   images,
                // } = row;
                return dispatch(view_item({ ...row }));
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              variant="contained"
              color="black_"
              fullWidth
              onClick={() => handleDelete(params.row)}
            >
              <RemoveCircle fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
      />
    </Box>
  );
};

export default DataTable;
