const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");
const Student = require("../models/studentModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a Student

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, collegeCanteen } = req.body;

  const student = await Student.create({
    name,
    email,
    password,
    collegeCanteen,
  });

  sendToken(student, 201, res);
});

//Login Student

exports.loginStudent = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if student has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (!student) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await student.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(student, 200, res);
});

//Logout student

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forget Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });

  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  // Get ResetPasswordToken

  const resetToken = student.getResetPasswordToken();

  await student.save({ validateBeforeSave: false });

  // const resetpasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const resetpasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is:  \n\n ${resetpasswordUrl} \n\nIf you have not requested this email then, please ignore it `;

  try {
    await sendEmail({
      email: student.email,
      subject: "Canteen Password Recovery Email",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${student.email} successfully`,
    });
  } catch (error) {
    student.resetPasswordToken = undefined;
    student.resetPasswordExpire = undefined;

    await student.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(resetPasswordToken)
  console.log(req.params.token)

  const student = await Student.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log(student)

  if (!student) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matches", 400));
  }

  student.password = req.body.password;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpire = undefined;

  await student.save();

  sendToken(student, 200, res);
});
