// import React, { useHistory } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import logo from "./logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-use-history";

const STRIPE_PUBLISHABLE =
  "pk_test_51LuHWjIrf1lB0G3iz6HSou9w7JOL4auHTLzWFDROCOCUc6Bt28hrwni9VuoEAejpCN6wqAYVcverU9cFtcEglPax00s0qlfIsI";
const PAYMENT_SERVER_URL = "http://localhost:8000/api/payment";

const fromUSDToCent = (amount) => amount * 100;

const Checkout = () => {
  const name = "Ocean Store";
  const description = "Buy some cool stuff";
  const amount = 10;
  const CURRENCY = "USD";

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const history = useHistory();
  useEffect(() => {
    const makePayment = async () => {
      try {
        axios
          .post(PAYMENT_SERVER_URL, {
            description,
            source: stripeToken.id,
            currency: CURRENCY,
            amount: fromUSDToCent(amount),
          })
          .then((data) => {
            toast.success("Payment Successful");
            history.push("/success");
          })
          .catch((err) => {
            toast.error("Payment Failed");
            // console.log("Payment Failed");
          });
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    if (stripeToken) makePayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeToken]);

  return (
    <>
      <StripeCheckout
        name={name}
        description={description}
        amount={fromUSDToCent(amount)}
        token={onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        image={logo}
      >
        <button className="btn">Pay with Stripe</button>
      </StripeCheckout>
      <ToastContainer />
    </>
  );
};
export default Checkout;
