const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser");
const dotenv =require('dotenv');


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

app.use("/api/v1",item);
app.use("/api/v1",student);
app.use("/api/v1",owner);
app.use("/api/v1",order);

// Middleware for Errrors

app.use(errorMiddleware);

module.exports = app;