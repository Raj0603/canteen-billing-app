const express = require("express");
const {
  registerOwner,
  loginOwner,
  forgotoPassword,
  resetoPassword,
  ologout,
  getOwnerDetails,
  updateoPassword,
  updateoProfile,
  getAllOwners,
  getSingleOwner,
  deleteOwner,
} = require("../controllers/ownerController");

const { isAuthenticated, authorizeOwnerRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/oregister").post(registerOwner);

router.route("/ologin").post(loginOwner);

router.route("/opassword/forgot").post(forgotoPassword);

router.route("/opassword/reset/:token").put(resetoPassword);

router.route("/ologout").get(ologout);

router.route("/ome").get(isAuthenticated, getOwnerDetails);

router.route("/opassword/update").put(isAuthenticated, updateoPassword);

router.route("/ome/update").put(isAuthenticated, updateoProfile);

router
  .route("/admin/owner")
  .get(isAuthenticated, authorizeOwnerRoles("admin"), getAllOwners);

router
  .route("/admin/owner/:id")
  .get(isAuthenticated, getSingleOwner)
  .delete(isAuthenticated, authorizeOwnerRoles("admin"), deleteOwner);

module.exports = router;
