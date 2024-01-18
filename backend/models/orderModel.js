
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "items",
        required: true,
      },
      type:{
        type: String,
        required: true
      }
    },
  ],
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "student",
    required: true,
  },
  canteen:{
    type: String,
    // ref: "owners",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
      default:"cghfgchjf"
    },
    status: {
      type: String,
      required: true,
      default:"Paid"
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Cooking",
  },
});

module.exports = mongoose.model("Order", orderSchema)
