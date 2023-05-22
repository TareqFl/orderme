import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { checkout, navigation } from "../../Actions";
import CheckoutCards from "../CheckoutCards";
import { TextField } from "@mui/material";
import { ClimbingBoxLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "24px",
};

export default function BasicModal() {
  const dispatch = useDispatch();
  const { Checkout, Cart } = useSelector((state) => state);
  const handleClose = () => dispatch(checkout(false));

  return (
    <div>
      <Modal
        open={Checkout}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {Cart.length !== 0 ? (
          <Box
            sx={{
              ...style,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                fontSize: "1.2rem",
                textAlign: "left",
                mb: 1,
              }}
            >
              ORDER SUMMARY
            </Typography>
            {/* Display Items */}
            <Box
              sx={{
                height: 200,
                width: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {Cart?.map((product, index) => {
                return (
                  <CheckoutCards key={index} product={product} index={index} />
                );
              })}
            </Box>
            {/* Coupons */}
            <TextField
              variant="outlined"
              value="SPINGSX:22561"
              label="Discount Code"
              focused={true}
              color="action"
            />

            {/* Total and costs */}
            {["Subtotal", "Shipping Cost", "Discount (20%)", "Total"].map(
              (row, indx) => {
                return (
                  <Box
                    key={indx}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                        fontWeight: 500,
                        mt: indx === 3 && 1,
                        mb: indx === 3 && 1,
                      }}
                    >
                      {row}
                    </Typography>
                    <Typography
                      sx={{
                        color: indx === 2 && "tomato",
                        fontWeight: 900,
                        letterSpacing: 1,
                      }}
                    >
                      {indx === 2 && "-"}
                      {indx === 1 && "+0."}
                      {indx === 3 && "$"}
                      {Math.round(Math.random() * 100 * (indx + 1))}
                    </Typography>
                  </Box>
                );
              }
            )}
            {/* Checkout Button */}
            <Button
              variant="contained"
              color="orange_"
              sx={{
                bgcolor: "#fb7744",
                fontWeight: 900,
                color: "white",
                letterSpacing: 0.5,
                boxShadow: "0px 0px 2px 2px #fb8556",
              }}
              onClick={() => {
                dispatch(checkout(false));
                return dispatch(navigation({ page: "buy", data: null }));
              }}
            >
              Checkout
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography textAlign="center">Your Cart is Empty</Typography>
            <ClimbingBoxLoader color="#fb6a01" />
          </Box>
        )}
      </Modal>
    </div>
  );
}
