const express = require("express");
const router = express.Router();

const {isAuthenticated, authorizeRoles, authorizeOwnerRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder,  getAdminOrders, getSinglAdminOrder } = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated,authorizeOwnerRoles("owner"),getSingleOrder);

router.route("/admin/order/:id").get(isAuthenticated, authorizeRoles("admin"),getSingleOrder);

router.route("/me/order").get(isAuthenticated, myOrders);

router.route("/orders/:id").get(isAuthenticated, authorizeOwnerRoles("owner"), getAllOrders);

router.route("/admin/orders").get(isAuthenticated, authorizeRoles("admin"), getAdminOrders);

router.route("/owner/orders/:id").put(isAuthenticated, authorizeOwnerRoles("owner"), updateOrder).delete(isAuthenticated, authorizeOwnerRoles("owner"), deleteOrder);

module.exports = router;