import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { Search as SearchIcon, Menu, ShoppingCart } from "@mui/icons-material";
import logo from "../Assets/logo.webp";
import CustomMenu from "./Menu_custom";
import { useDispatch, useSelector } from "react-redux";
import { authentication, handle_drawer } from "../Actions";
import CustomButton from "./ButtonCustom";
import CategoryBar from "./CategoryBar";
import { navigation, open_modal } from "../Actions";
import { checkout } from "../Actions";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  flexGrow: 0.5,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "36ch",
      },
    },
  },
}));

export default function SearchAppBar({ sx }) {
  const dispatch = useDispatch();

  const {
    Authentication,
    Cart,
    // Navigation
  } = useSelector((state) => state);
  const { auth, username } = Authentication;
  // const { page } = Navigation;
  // Handlers
  function handleNavigation({ page, data = null }) {
    dispatch(
      navigation({
        page,
        data,
      })
    );
  }

  function handleAuthentication() {
    if (!auth) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      return dispatch(open_modal(true));
    }
    window.localStorage.clear();
    window.sessionStorage.clear();
    return dispatch(authentication({ username: "", auth: false }));
  }

  return (
    <Box
      sx={{
        ...sx,
        flexGrow: 1,
        "&": {
          ".MuiToolbar-root": {
            gap: 2,
            justifyContent: "space-between",
          },
          ".MuiAppBar-root": {
            paddingTop: 1,
            paddingBottom: 1,
          },
        },
        // borderBottom:"1px solid gray",
        position: "relative",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Stack display={"flex"} flexDirection="row" alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1, backgroundColor: "white", padding: 0 }}
              onClick={() => handleNavigation({ page: "home" })}
            >
              <Avatar sx={{ width: 64, height: 64 }} src={logo} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } }}
            >
              ORDERME
            </Typography>
          </Stack>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Options & Account */}
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={1}
          >
            {/* Other Options */}

            <CustomButton
              badgeContent={Cart.length}
              icon={<ShoppingCart color="action" fontSize="medium" />}
              click={() => dispatch(checkout(true))}
            />

            {/* End of other options */}
            <IconButton
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                },
              }}
              onClick={() => dispatch(handle_drawer())}
            >
              <Menu fontSize="large" />
            </IconButton>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            />
            <Typography
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
                fontWeight: "bold",
              }}
            >
              {auth ? username : "Guest"}
            </Typography>
            {/* <IconButton
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              <Avatar src={image ? image : ""} />
            </IconButton> */}
            <Button
              variant="contained"
              color="orange_"
              sx={{
                letterSpacing: {
                  xs: "0.5",
                  sm: 2,
                },
                fontWeight: "bold",
              }}
              onClick={handleAuthentication}
            >
              {auth ? "Logout" : "login"}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <CustomMenu />
      <CategoryBar />
    </Box>
  );
}
