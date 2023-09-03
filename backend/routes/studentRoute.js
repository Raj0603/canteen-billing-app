const express = require("express");
const {
  registerStudent,
  loginStudent,
  logout,
  forgotPassword,
  resetPassword,
  getStudentDetails,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateProfile,
  updatePassword,
} = require("../controllers/studentController");

const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerStudent);

router.route("/login").post(loginStudent);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getStudentDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllStudents);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleStudent)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteStudent);

module.exports = router;
