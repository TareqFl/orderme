import React from "react";
import {
  Box,
  ClickAwayListener,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { navigation } from "../Actions";

const CustomSearch = () => {
  const dispatch = useDispatch();
  const { Products } = useSelector((state) => state);

  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  //   Handler
  function handleChange(event) {
    const { value } = event.target;
    setText(value);
    const searched_product = Products?.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    if (value.length === 0) {
      setItems((prev) => []);
      return setOpen(false);
    }
    if (searched_product.length > 0) {
      setOpen(true);
      return setItems((prev) => [...searched_product]);
    }
  }
  return (
    <ClickAwayListener
      onClickAway={() => {
        setText("");
        setOpen(false);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          gap: 0.5,
          flexGrow: 0.5,
          backgroundColor: grey[400],
          borderRadius: 0.75,
          position: "relative",
          p: 0.45,
          pl: 1,
          input: {
            flexGrow: 1,
            width: {
              sm: "100px",
              md: "400px",
              lg: "600px",
            },
            "&": {
              ":focus": {
                width: {
                  sm: "200px",
                  md: "500px",
                  lg: "800px",
                },
                transition: ".5s",
              },
            },
            transition: ".35s",
          },
        }}
      >
        <SearchIcon />
        <InputBase
          type="text"
          placeholder="Search..."
          value={text}
          onChange={handleChange}
        />
        <Box
          sx={{
            p: open ? 1 : 0,
            position: "absolute",
            left: 0,
            top: 40,
            width: open ? 400 : 0,
            height: open ? 200 : 0,
            backgroundColor: grey[900],
            zIndex: 10,
            transition: ".25s",
            overflowY: open ? "auto" : "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {items?.map((item, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
                sx={{
                  img: {
                    width: 100,
                    height: 100,
                  },
                  cursor: "pointer",
                  "&": {
                    ":hover": {
                      backgroundColor: grey[400],
                      transition: ".35s",
                    },
                  },
                }}
                onClick={() => {
                  dispatch(
                    navigation({
                      page: "product_page",
                      data: item,
                    })
                  );
                  setText("");
                  return setOpen(false);
                }}
              >
                <img src={item.thumbnail} alt={`ima${index}`} />
                <Typography sx={{ color: "white" }}>{item.title}</Typography>
                <Typography sx={{ color: "white" }}>{item.category}</Typography>
              </Stack>
            );
          })}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default CustomSearch;
