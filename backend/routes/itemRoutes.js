const express = require("express");
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemDetails,
  getAdminItems,
  createItemReview,
  getItemReviews,
  deleteReviews,
} = require("../controllers/itemsController");
const { isAuthenticated, authorizeOwnerRoles, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/items").get( getAllItems);
router.route("/admin/items").get( isAuthenticated, authorizeRoles("admin"), getAdminItems);

router.route("/item/new").post(isAuthenticated, authorizeOwnerRoles("owner"), createItem);
router
  .route("/item/:id")
  .put(isAuthenticated,authorizeOwnerRoles("owner"), updateItem)
  .delete(isAuthenticated,authorizeOwnerRoles("owner"), deleteItem)
  .get(getItemDetails);

router.route("/review").put(isAuthenticated, createItemReview);

router.route("/reviews").get(isAuthenticated, getItemReviews).delete(isAuthenticated, deleteReviews);


module.exports = router;
