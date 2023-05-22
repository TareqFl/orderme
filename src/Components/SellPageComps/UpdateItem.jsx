import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import { cats } from "../../fakeData";
import { useDispatch, useSelector } from "react-redux";

const UpdateItem = () => {
  const [values, setValues] = React.useState({
    id: 1,
    title: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    thumbnail: "",
    images: [],
    changed_thumbnail: false,
    changed_images: false,
  });
  //   eslint-disable-next-line
  const {
    id,
    title,
    brand,
    price,
    description,
    category,
    thumbnail,
    images,
    changed_thumbnail,
    changed_images,
  } = values;

  async function handleSubmit() {
    const url = process.env.REACT_APP_DOMAIN_NAME;
    const body = new FormData();
    body.append("id", id);
    body.append("title", title);
    body.append("brand", brand);
    body.append("price", price);
    body.append("description", description);
    body.append("changed_thumbnail", changed_thumbnail);
    body.append("changed_images", changed_images);
    body.append("category", category);
    body.append("thumbnail", thumbnail);
    images.forEach((image, index) => {
      body.append(`images${index}`, image);
    });
    const response = await fetch(url + "/update_product", {
      method: "POST",
      body,
    });
    // eslint-disable-next-line
    const data = await response.json();
  }

  // eslint-disable-next-line
  const dispatch = useDispatch();

  const { Item_view } = useSelector((state) => state);
  React.useEffect(() => {
    if (Item_view !== null) {
      setValues({
        ...Item_view,
        changed_thumbnail: false,
        changed_images: false,
      });
    }
  }, [Item_view]);

  async function handleDelete(url_image_delete, index) {
    if (typeof images[index] === "string") {
      const response = await fetch(url_image_delete, {
        method: "DELETE",
      });

      // esling-disable-next-line
      const data = await response.json();
    }

    const images_arr = [...images];
    images_arr.splice(index, 1);
    return setValues((prevV) => ({ ...prevV, images: images_arr }));
  }

  return (
    <Box sx={{ pt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Title"
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <TextField
        label="Brand"
        value={brand}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, brand: e.target.value }))
        }
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, price: e.target.value }))
        }
      />
      <TextareaAutosize
        label="Description"
        minRows={5}
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cats}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        onChange={(e, v) => {
          if (v.label === null) {
            return setValues((prev) => ({ ...prev, category: "" }));
          } else {
            return setValues((prev) => ({ ...prev, category: v.label }));
          }
        }}
        value={category}
      />

      {/* Thumbnail */}
      <Stack id="thumbnail" direction="row" alignItems="center">
        <Stack direction="column">
          <Typography>Thumbnail</Typography>
          <input
            type="file"
            multiple={false}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                thumbnail: e.target.files[0],
                changed_thumbnail: true,
              }))
            }
          />
        </Stack>
        <Button id="display thumbnail" sx={{ img: { width: 200 } }}>
          {/* eslint-disable-next-line */}
          <img
            src={
              typeof thumbnail === "string"
                ? thumbnail
                : URL.createObjectURL(thumbnail)
            }
          />
        </Button>
      </Stack>

      {/* Images */}
      <Stack id="thumbnail" direction="row" alignItems="center">
        <Stack direction="column">
          <Typography>Add/Remove Images</Typography>
          <input
            type="file"
            multiple={true}
            onChange={(e) => {
              const files = e.target.files;
              setValues((prev) => ({
                ...prev,
                images: [...files, ...images],
                changed_images: true,
              }));
            }}
          />
        </Stack>
        <Stack flexDirection="row" alignItems="center" flexWrap="wrap" gap={2}>
          {images?.map((image, index) => {
            return (
              <Button
                key={index}
                sx={{ img: { width: 100 } }}
                onClick={() => handleDelete(image, index)}
              >
                {/* eslint-disable-next-line */}
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                />
              </Button>
            );
          })}
        </Stack>
      </Stack>
      <Button
        variant="contained"
        color="orange_"
        sx={{ color: "white", fontWeight: 900 }}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Box>
  );
};

export default UpdateItem;
