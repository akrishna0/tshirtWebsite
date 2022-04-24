const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/payment");

router.get("/payment/gettoken/:userId", isSignedIn, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  // isAuthenticated,
  processPayment
);

module.exports = router;
