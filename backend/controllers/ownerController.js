const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAE");
const Owner = require("../models/ownerModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a Owner

exports.registerOwner = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, ownerCollegeName } = req.body;

  const owner = await Owner.create({
    name,
    email,
    password,
    ownerCollegeName,
  });

  sendToken(owner, 201, res);
});

//Login Owner

exports.loginOwner = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if Owner has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const owner = await Owner.findOne({ email }).select("+password");

  if (!owner) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await owner.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(owner, 200, res);
});

//Logout Owner

exports.ologout = catchAsyncErrors(async (req, res, next) => {
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

exports.forgotoPassword = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findOne({ email: req.body.email });

  if (!owner) {
    return next(new ErrorHandler("Owner not found", 404));
  }

  // Get ResetPasswordToken

  const resetToken = owner.getResetPasswordToken();

  await owner.save({ validateBeforeSave: false });

  // const resetpasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const resetpasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/opassword/reset/${resetToken}`;

  const message = `Your password reset link is:  \n\n ${resetpasswordUrl} \n\nIf you have not requested this email then, please ignore it `;

  try {
    await sendEmail({
      email: owner.email,
      subject: "Canteen Password Recovery Email",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${owner.email} successfully`,
    });
  } catch (error) {
    owner.resetOwnerPasswordToken = undefined;
    owner.resetOwnerPasswordExpire = undefined;

    await owner.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetoPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token Hash
  const resetOwnerPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const owner = await Owner.findOne({
    resetOwnerPasswordToken,
    resetOwnerPasswordExpire: { $gt: Date.now() },
  });

  if (!owner) {
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

  owner.password = req.body.password;
  owner.resetOwnerPasswordToken = undefined;
  owner.resetOwnerPasswordExpire = undefined;

  await owner.save();

  sendToken(owner, 200, res);
});

// Get Owner Dertails
exports.getOwnerDetails = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findById(req.owner.id);

  res.status(200).json({
    success: true,
    owner,
  });
});

// Update Password

exports.updateoPassword = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findById(req.owner.id).select("+password");

  const isPasswordMatched = await owner.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched", 400));
  }

  owner.password = req.body.newPassword;

  await owner.save();

  sendToken(owner, 200, res);
});

// Update Owner Profile

exports.updateoProfile = catchAsyncErrors(async (req, res, next) => {
  const newOwnerData = {
    name: req.body.name,
    email: req.body.email,
  };

  const owner = await Owner.findByIdAndUpdate(req.owner.id, newOwnerData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    owner,
  });
});

// Get all Owners --Admin

exports.getAllOwners = catchAsyncErrors(async (req, res, next) => {
  const owners = await Owner.find();

  res.status(200).json({
    success: true,
    owners,
  });
});

// Get Single Owners --Admin

exports.getSingleOwner = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findById(req.params.id);

  if (!owner) {
    return next(
      new ErrorHandler(`Owner does not exist with id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    owner,
  });
});


// Delete Owner --Admin
exports.deleteOwner = catchAsyncErrors(async (req, res, next) => {
  const owner = await Owner.findById(req.params.id);


  if (!owner) {
    return next(
      new ErrorHandler(`Owner does not exist with id ${req.params.id}`, 400)
    );
  }

  await owner.deleteOne();

  res.status(200).json({
    success: true,
    message: "Owner Deleted Successfully",
  });
});
