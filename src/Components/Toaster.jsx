import { Box } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";

const Toaster = ({ children }) => {
  return (
    <Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </Box>
  );
};

export default Toaster;
