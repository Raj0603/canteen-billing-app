const mongoose = require("mongoose");
const {ownerSchema} = require("../models/ownerModel")


const itemSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter item's name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter item's description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter item's Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  collegeCanteen: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Please enter item's type veg/non-veg"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category:{
    type:String,
    required:[true,"Please enter item's Category"],
  },
  availability:{
    type:Boolean,
    required:true,
    default:true
  },
  numOfReviews:{
    type: Number,
    default: 0,
  },
  reviews:[
    {
      student: {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
        required: true,
      },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required: true,
        }
    }
  ],

});

module.exports = mongoose.model("item", itemSchemas);