import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { cats } from "../../fakeData";
import { useDispatch } from "react-redux";
import { toaster_error, toaster_success } from "../../Actions";
import { getStoreProduct } from "../../helpers/getStoreProducts";
import { show_store_products } from "../../Actions";

const Newitem = () => {
  const dispatch = useDispatch();
  // const [files, setFiles] = React.useState(null);
  const [values, setValues] = React.useState({
    title: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    thumbnail: "",
    files: "",
  });

  const [view, setView] = React.useState("");
  const [multi, setMulti] = React.useState([]);
  const { title, price, category, description, thumbnail, brand, files } =
    values;

  // Refs
  const thumbRef = React.createRef();
  const imagesRef = React.createRef();

  //hanlder
  async function handleSubmit() {
    let fact = false;
    let empty_key = "";
    const form_keys = Object.keys(values);
    form_keys.forEach((key) => {
      if (values[key] === "") {
        fact = true;
        empty_key = key;
      }
    });
    if (!files) {
      fact = true;
      empty_key = "images";
    }
    if (fact) {
      return dispatch(toaster_error(`${empty_key} field is empty`));
    }
    const inputs = new FormData();
    inputs.append("title", title);
    inputs.append("price", price);
    inputs.append("brand", brand);
    inputs.append("description", description);
    inputs.append("category", category);
    inputs.append("thumbnail", thumbnail);
    files?.forEach((file, index) => inputs.append(`images${index}`, file));

    try {
      await fetch(process.env.REACT_APP_DOMAIN_NAME + "/add_product", {
        method: "POST",
        body: inputs,
      });
      setMulti((prev) => []);
      setView("");
      setValues((prevV) => {
        return {
          title: "",
          brand: "",
          price: "",
          description: "",
          category: "",
          thumbnail: "",
        };
      });
      getStoreProduct().then((data) =>
        dispatch(show_store_products(data.products))
      );
      return dispatch(toaster_success("New item Added"));
    } catch (err) {
      return dispatch(toaster_error("something went wrong" + err.message));
    }
  }
  //End of Submit

  // Product main DP
  function handleThumbnail(event) {
    const bla = URL.createObjectURL(event.target.files[0]);
    setValues((prevValue) => {
      return { ...values, thumbnail: event.target.files[0] };
    });
    setView(bla);
  }

  // Product Images
  function handleImages(event) {
    const files = [...event.target.files];
    const blobs = files.map((blob) => URL.createObjectURL(blob));
    // setFiles([...files]);
    setValues((prev) => {
      return {
        ...prev,
        files,
      };
    });
    setMulti([...blobs]);
  }

  function handleClear() {
    // setFiles((prev) => []);
    setMulti((prev) => []);
    setView("");
    setValues((prevV) => {
      return {
        title: "",
        brand: "",
        price: "",
        description: "",
        category: "",
        thumbnail: "",
      };
    });
  }
  // End of Handlers

  React.useEffect(() => {
    setMulti((prev) => []);
    setView("");
    setValues((prevV) => {
      return {
        title: "",
        brand: "",
        price: "",
        description: "",
        category: "",
        thumbnail: "",
      };
    });
    thumbRef.current.value = "";
    imagesRef.current.value = "";
    // eslint-disable-next-line
  }, []);
  return (
    <Box sx={{ pt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        variant="contained"
        color="orange_"
        sx={{ fontWeight: 900, color: "#fff" }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <TextField
        label="Title"
        color="black_"
        value={title}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <TextField
        label="Brand"
        color="black_"
        value={brand}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, brand: e.target.value }))
        }
      />
      <TextField
        label="Price"
        color="black_"
        value={price}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, price: e.target.value }))
        }
      />
      <TextareaAutosize
        color="black_"
        value={description}
        placeholder="Description"
        minRows={5}
        onChange={(e) =>
          setValues((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <Autocomplete
        color="black_"
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
          if (v === null) {
            return setValues((prev) => ({ ...prev, category: "" }));
          } else {
            setValues((prev) => ({ ...prev, category: v.label }));
          }
        }}
      />

      <Box>
        {/* Thumbnail Container */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <Typography>Thumbnail</Typography>
            {/* <FileBase64 onDone={handleThumbnail} multiple={false} /> */}
            <input
              type="file"
              name="thumbnail"
              multiple={false}
              onChange={handleThumbnail}
              ref={thumbRef}
            />
          </Box>
          <Box>
            <Button
              sx={{
                img: {
                  width: 200,
                },
                "&:hover": {
                  img: {
                    filter: "blur(4px)",
                    transition: "0.7s",
                  },
                },
              }}
              onClick={() => {
                setView("");
                return setValues((prevV) => {
                  return { ...prevV, thumbnail: "" };
                });
              }}
            >
              {/* eslint-disable-next-line */}
              <img src={view} />
            </Button>
          </Box>
        </Box>
        {/* End of thumbnail container */}
        {/* Images container */}
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <Typography>Images</Typography>

            <input
              type="file"
              multiple={true}
              onChange={handleImages}
              ref={imagesRef}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {multi.map((image, index) => (
              <Button
                key={index}
                sx={{
                  img: {
                    width: 100,
                  },
                  "&:hover": {
                    img: {
                      filter: "blur(4px)",
                      transition: "0.7s",
                    },
                  },
                }}
                onClick={() => {
                  let new_arr = files;
                  new_arr.splice(index, 1);
                  // setFiles((prev) => [...new_arr]);
                  setValues((prev) => {
                    return {
                      ...prev,
                      files: [...new_arr],
                    };
                  });
                  new_arr = multi;
                  new_arr.splice(index, 1);
                  return setMulti((prev) => [...new_arr]);
                }}
              >
                {/* eslint-disable-next-line */}
                <img src={image} />
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      {/* End of Images container */}
      <Button
        type="submit"
        variant="contained"
        color="warning"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Newitem;
