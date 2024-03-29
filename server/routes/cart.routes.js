const router = require("express").Router();

const {
	authenticateToken,
	authenticateAdmin,
} = require("#middlewares");
const { cartCtrl } = require("#controllers");

router.get(
	"/carts",
	authenticateToken,
	authenticateAdmin,
	cartCtrl.getAllCarts
);
router.get("/cart", authenticateToken, cartCtrl.getCart);
router.post("/cart", authenticateToken, cartCtrl.createCart);
router.post(
	"/cart/add",
	authenticateToken,
	cartCtrl.addToCart
);
router.put(
	"/cart/update",
	authenticateToken,
	cartCtrl.updateCart
);
router.delete("/cart/deleteItem", authenticateToken, cartCtrl.deleteCartItem);
router.delete(
	"/cart/:cartId",
	authenticateToken,
	authenticateAdmin,
	cartCtrl.deleteCart
);

module.exports = router;
