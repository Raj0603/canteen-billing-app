const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser");
const dotenv =require('dotenv');
const path = require('path')

//Config

dotenv.config({path:"backend/config/config.env"});

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// Routes Imports 

const item = require("./routes/itemRoutes");
const student = require("./routes/studentRoute");
const owner = require("./routes/ownerRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1",item);
app.use("/api/v1",student);
app.use("/api/v1",owner);
app.use("/api/v1",order);
app.use("/api/v1",payment);

// Middleware for Errrors

app.use(errorMiddleware);

app.get("/api/v1/getkey", (req, res) => {
    res.status(200).json({key: process.env.RAZORPAY_API_KEY})
})

app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
})


module.exports = app;