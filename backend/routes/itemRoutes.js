const express = require("express");
const { getAllItems, createItem, updateItem, deleteItem, getItemDetails } = require("../controllers/itemsController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/items").get(isAuthenticated, authorizeRoles("admin"), getAllItems);
router.route("/item/new").post(createItem);
router.route("/item/:id").put(updateItem).delete(deleteItem).get(getItemDetails);

module.exports = router;