const moongose = require("mongoose");

const itemSchemas = new moongose.Schema({
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
  type: {
    type: String,
    required: [true, "Please enter item's type"],
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
    default:false
  },
  numOfReviews:[
    {
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
        }
    }
  ],

});

module.exports = moongose.model("item", itemSchemas);