import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  navigation,
  toaster_error,
  toaster_toaster,
} from "../Actions";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  //eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          dispatch(add_to_cart([]));
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Please Enter your Card details to Purchase");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
    //eslint-disable-next-line
  }, [stripe]);

  useEffect(() => {
    if (!Cart.length) {
      dispatch(navigation({ page: "home", data: null }));
    }
    // eslint-disable-next-line
  }, [Cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      dispatch(toaster_error("error"));
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://127.0.0.1:5000/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      dispatch(toaster_error("Card Error"));
    } else {
      dispatch(toaster_error("soemthing unexpected happened"));
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Container maxWidth="xs">
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.value.email)}
        />
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions}
          onReady={() =>
            // alert(
            //   "type Card 4242 4242 4242 4242 and any date and cvc to continue"
            // )
            dispatch(toaster_toaster("use Card 4242 4242 4242 4242 "))
          }
        />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Container>
  );
}
