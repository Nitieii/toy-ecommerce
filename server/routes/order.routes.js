const router = require("express").Router();

const { authenticateToken, authenticateAdmin } = require("#middlewares");
const { orderCtrl } = require("#controllers");

router.get(
  "/orders",
  authenticateToken,
  authenticateAdmin,
  orderCtrl.getAllOrders
);

router.get("/orders/user", authenticateToken, orderCtrl.getUserOrders);

router.get("/order/:id", authenticateToken, orderCtrl.getOrder);

router.post("/order", authenticateToken, orderCtrl.createOrder);

router.put("/order/:id", authenticateToken, orderCtrl.confirmOrder);

module.exports = router;
