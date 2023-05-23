import { Box, CssBaseline } from "@mui/material";
import React from "react";
import NavBar from "./Components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductPage from "./Pages/ProductPage";
import Home from "./Pages/Home";
import Login from "./Components/Modals/Login";
import BuyersProtection from "./Components/Modals/BuyersProtection";
import Flash from "./Components/Flash";
import { authentication } from "./Actions";
import TokenHandler from "./helpers/TokenHandler";
import CheckOut from "./Components/Modals/CheckOut";
import Buy from "./Pages/Buy";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Sell from "./Pages/Sell";
import "react-toastify/dist/ReactToastify.css";
import Toaster from "./Components/Toaster";
const App = () => {
  const { themeMode, Navigation } = useSelector((state) => state);
  const { page } = Navigation;
  const darkTheme = {};
  const lightTheme = {
    primary: {
      // main: "#023c29",
      main: "#f5f5f5",
    },
    secondary: {
      main: "#fdfdfd",
      // main: "#023c29",
    },
    orange_: {
      main: "#fb6a01",
    },
    black_: {
      main: "#191a23",
    },
    red_: {
      main: "#ee174a",
    },
    yellow_: {
      main: "#ffc001",
    },
    textColor: {
      main: "#333",
    },
  };
  const customTheme = createTheme({
    palette: themeMode === "light" ? { ...lightTheme } : { ...darkTheme },
    typography: {
      fontFamily: ["Ubuntu", "Roboto", "sans-serif"].join(","),
    },
  });

  // function getOS() {
  //   var userAgent = window.navigator.userAgent,
  //     platform =
  //       window.navigator?.userAgentData?.platform || window.navigator.platform,
  //     macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
  //     windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
  //     iosPlatforms = ["iPhone", "iPad", "iPod"],
  //     os = null;

  //   if (macosPlatforms.indexOf(platform) !== -1) {
  //     os = "Mac OS";
  //   } else if (iosPlatforms.indexOf(platform) !== -1) {
  //     os = "iOS";
  //   } else if (windowsPlatforms.indexOf(platform) !== -1) {
  //     os = "Windows";
  //   } else if (/Android/.test(userAgent)) {
  //     os = "Android";
  //   } else if (/Linux/.test(platform)) {
  //     os = "Linux";
  //   }

  //   return os;
  // }
  const dispatch = useDispatch();
  React.useEffect(() => {
    //eslint-disable-next-line
    const token = new TokenHandler();
    token.local = window.localStorage.getItem("token");
    token.session = window.sessionStorage.getItem("token");
    token.execute().then((value) => {
      dispatch(authentication({ ...value }));
    });

    // eslint-disable-next-line
  }, [page]);

  // Stripe

  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(process.env.REACT_APP_DOMAIN_NAME + "/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: "username" }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PB);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Toaster>
          <Box sx={{ overflow: "hidden" }}>
            <CssBaseline />
            <NavBar />
            <Flash />
            {page === "home" && <Home />}
            {page === "product_page" && <ProductPage />}
            {page === "sell" && <Sell />}
            {page === "buy" && (
              <Elements options={options} stripe={stripePromise}>
                <Buy clientSecret={clientSecret} />
              </Elements>
            )}
            <Login />
            <BuyersProtection />
            <CheckOut />
          </Box>
        </Toaster>
      </ThemeProvider>
    </>
  );
};

export default App;
