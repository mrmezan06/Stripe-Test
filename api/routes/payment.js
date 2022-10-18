const configureStripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = configureStripe(STRIPE_SECRET_KEY);

const router = require("express").Router();

const postStripeCharge = (res) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.post("/payment", (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
});

module.exports = router;
