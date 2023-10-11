const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAE");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Owner = require("../models/ownerModel")

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.student = await Student.findById(decodedData.id);
  req.owner = await Owner.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.student.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.student.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

exports.authorizeOwnerRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.owner.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.owner.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
