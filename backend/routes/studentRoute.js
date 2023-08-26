const express = require("express");
const {registerStudent, loginStudent, logout, forgotPassword, resetPassword}= require("../controllers/studentController")

const router = express.Router();

router.route("/studregister").post(registerStudent);

router.route("/studlogin").post(loginStudent);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/studlogout").get(logout);

module.exports = router;