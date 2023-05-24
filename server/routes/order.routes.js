const router = require("express").Router();

const { authenticateToken, authenticateAdmin } = require("#middlewares");
const { orderCtrl } = require("#controllers");

router.get(
  "/orders",
  authenticateToken,
  authenticateAdmin,
  orderCtrl.getAllOrders
);

router.get("/order/:id", authenticateToken, orderCtrl.getOrder);

router.post("/order", authenticateToken, orderCtrl.createOrder);

router.put("/orders/:id", authenticateToken, orderCtrl.confirmOrder);

module.exports = router;
