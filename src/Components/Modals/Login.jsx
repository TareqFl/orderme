import * as React from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  open_modal,
  authentication,
  toaster_error,
  toaster_toaster,
} from "../../Actions";
import {
  Avatar,
  Paper,
  Stack,
  TextField,
  Checkbox,
  Backdrop,
  Fade,
  Button,
  Modal as ModalMUI,
  Box,
} from "@mui/material";
import logo from "../../Assets/logo.webp";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function TransitionsModal() {
  const [registration, setRegistration] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [agree, setAgree] = React.useState(true);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { Modal } = useSelector((state) => state);
  const { username, password } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // eslint-disable-next-line
    switch (name) {
      case "username":
        return setForm((prevV) => {
          return {
            ...prevV,
            username: value,
          };
        });
      case "email":
        return setForm((prevV) => {
          return {
            ...prevV,
            email: value,
          };
        });
      case "password":
        return setForm((prevV) => {
          return {
            ...prevV,
            password: value,
          };
        });
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_DOMAIN_NAME}/${
        registration ? "register" : "login"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const data = await response.json();
    const { token, message, image } = data;

    if (response.status !== 200) {
      return dispatch(toaster_error(message));
    }

    dispatch(
      authentication({
        auth: true,
        username: data.username,
        image: image ? image.slice(2, image.length - 1) : "",
      })
    );
    if (!remember) {
      dispatch(toaster_toaster(message));
      window.sessionStorage.setItem("token", token);
      dispatch(open_modal(false));
      return setForm({ username: "", password: "" });
    } else {
      dispatch(toaster_toaster(message));
      window.localStorage.setItem("token", token);
      dispatch(open_modal(false));
      return setForm({ username: "", password: "" });
    }
  };

  const handleClose = () => {
    setForm({
      username: "",
      password: "",
    });
    return dispatch(open_modal(false));
  };
  const handleStrong = () => {
    setRegistration(!registration);
  };

  return (
    <Box>
      <ModalMUI
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Modal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={Modal}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              borderRadius: "12px",
              width: {
                xs: 300,
                md: 400,
              },
              p: 2,
            }}
          >
            <Avatar
              className="logo"
              src={logo}
              alt="logo"
              sx={{ height: 64, width: 64 }}
            />
            <Typography
              sx={{
                "&": {
                  ".strong": {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    ml: 0.5,
                    mr: 0.5,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  },
                },
              }}
            >
              Click on{" "}
              <strong className="strong" onClick={handleStrong}>
                {registration ? "Sign In" : "Sign Up"}
              </strong>{" "}
              to {registration ? "enter." : "register."}
            </Typography>

            {/* form */}
            <TextField
              label="username"
              name="username"
              type="text"
              onChange={handleChange}
              value={username}
              color="black_"
            />

            <TextField
              label="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={password}
              color="black_"
            />
            {/* End */}

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack display="flex" direction="row" alignItems="center">
                <Checkbox
                  color="black_"
                  onClick={() => setRemember(!remember)}
                />
                <Typography>Stay signed in for a week</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  display: registration ? "flex" : "none",
                }}
              >
                <Checkbox
                  color="black_"
                  onClick={() => {
                    if (
                      username.length !== 0 &&
                      password.length !== 0 &&
                      agree
                    ) {
                      setAgree(false);
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                  }}
                >
                  Agree to all <strong>Terms</strong>,
                  <strong> Privacy Policy</strong> and <strong>Fees</strong>
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="contained"
              color="orange_"
              sx={{
                fontWeight: "bold",
                color: "white",
                width: "150px",
              }}
              onClick={handleSubmit}
              disabled={!registration ? false : agree}
            >
              {registration ? "Register" : "Login"}
            </Button>
          </Paper>
        </Fade>
      </ModalMUI>
    </Box>
  );
}
