const express = require("express");

const {
  checkout,
  orderVerification,
  paymentVerification,
} = require("../controllers/paymentController");

const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/checkout").post(isAuthenticated, checkout);
router
  .route("/payment")
  .post(isAuthenticated, paymentVerification);

router.route("/orderverify").post(isAuthenticated, orderVerification);

module.exports = router;
