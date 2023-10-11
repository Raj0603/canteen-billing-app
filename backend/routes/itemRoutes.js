const express = require("express");
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getItemDetails,
} = require("../controllers/itemsController");
const { isAuthenticated, authorizeOwnerRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/items").get( getAllItems);

router.route("/item/new").post(isAuthenticated, authorizeOwnerRoles("owner"), createItem);
router
  .route("/item/:id")
  .put(isAuthenticated,authorizeOwnerRoles("owner"), updateItem)
  .delete(isAuthenticated,authorizeOwnerRoles("owner"), deleteItem)
  .get(getItemDetails);

module.exports = router;
