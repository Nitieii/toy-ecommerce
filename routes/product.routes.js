const router = require("express").Router();

const { productCtrl } = require("#controllers");
const { authenticateToken, authenticateAdmin } = require("#middlewares");

const multer = require("multer");
const upload = multer({ dest: "files/products" });

router.get("/products", productCtrl.getAllProducts);
router.get("/products/search", productCtrl.searchProducts);
router.get("/product/:id", productCtrl.getProduct);
router.post(
	"/product",
	authenticateToken,
	authenticateAdmin,
	upload.array("images"),
	productCtrl.createProduct
);
router.put(
	"/product/:id",
	authenticateToken,
	authenticateAdmin,
	upload.array("images"),
	productCtrl.updateProduct
);
router.delete(
	"/product/:id",
	authenticateToken,
	authenticateAdmin,
	productCtrl.deleteProduct
);

module.exports = router;
