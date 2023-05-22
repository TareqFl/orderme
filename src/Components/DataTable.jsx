import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import { view_item } from "../Actions";

const DataTable = ({ rows }) => {
  const dispatch = useDispatch();

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
      width: 90,
      sortable: false,
      renderCell: (params) => {
        const image = params.row.thumbnail;

        return (
          <Paper sx={{ width: "100%", img: { width: "100%" } }}>
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
      width: "100%",
      renderCell: (params) => {
        return (
          <Stack direction="row" gap={2} width="100%">
            <Button
              variant="contained"
              color="black_"
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
              sx={{ color: "white" }}
            >
              View/Edit
            </Button>
          </Stack>
        );
      },
    },
  ];
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
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
