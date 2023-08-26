const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const dotenv =require('dotenv');


//Config

dotenv.config({path:"backend/config/config.env"});

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// Routes Imports 

const item = require("./routes/itemRoutes");
const user = require("./routes/studentRoute");

app.use("/api/v1",item);
app.use("/api/v1",user);

// Middleware for Errrors

app.use(errorMiddleware);

module.exports = app;