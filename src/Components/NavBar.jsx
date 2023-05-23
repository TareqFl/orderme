import * as React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import {
  ShoppingCart,
  Logout as LogoutIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import logo from "../Assets/logo.webp";
import CustomMenu from "./Menu_custom";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../Actions";
import CustomButton from "./ButtonCustom";
import CategoryBar from "./CategoryBar";
import { navigation, open_modal } from "../Actions";
import { checkout } from "../Actions";
import CustomSearch from "./CustomSearch";

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
          <CustomSearch />
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

            <Divider
              orientation="vertical"
              flexItem
              sx={
                {
                  // display: {
                  //   xs: "none",
                  //   sm: "block",
                  // },
                }
              }
            />
            <Typography
              sx={{
                // display: {
                //   xs: "none",
                //   sm: "block",
                // },
                fontWeight: "bold",
              }}
            >
              {auth ? username.substring(0, 5) : "Guest"}
            </Typography>

            <Button
              variant="contained"
              color="orange_"
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
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
            <IconButton
              variant="contained"
              color="orange_"
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                },
              }}
              onClick={handleAuthentication}
            >
              {auth ? <LogoutIcon /> : <LoginIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <CustomMenu />
      <CategoryBar />
    </Box>
  );
}
