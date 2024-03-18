const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel")

//payment gateway instance

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Checkout Function

exports.checkout = catchAsyncErrors(async (req, res, next) => {

  const options = {
    amount: Number(req.body.amount * 100), //amount in the smallest currency
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }

});

// Payment Verification
exports.paymentVerification = catchAsyncErrors(async (req, res) => {

  try {
    
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
  
      res.redirect(`/ordersuccess?reference=${razorpay_payment_id}`);
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    
  }
});

// Order Verification

exports.orderVerification = catchAsyncErrors(async (req, res, next) => {
  try {
    const verify = await Payment.findOne({razorpay_payment_id: req.body.reference});
  
    const orderVerify = await Order.findOne({paymentId: req.body.reference})
  
    if (verify && !orderVerify) {
      res.status(200).json({
        verified: true,
      });
    }
    
  } catch (error) {
    return next(new ErrorHandler("Invalid Order ID", 400))
  }
});
