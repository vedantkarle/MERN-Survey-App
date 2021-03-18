const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

router.post("/api/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "inr",
    source: req.body.id,
    description: "Rs.5 for 5 credits",
  });

  req.user.credits += 5;

  const user = await req.user.save();

  res.send({ user });
});

module.exports = router;
