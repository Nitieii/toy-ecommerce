const router = require("express").Router();

const { productCtrl } = require("#controllers");
const { authenticateToken } = require("#middlewares");

const multer = require("multer");
const upload = multer({ dest: "files/products" });

router.get("/products", productCtrl.getAllProducts);
router.get("/products/:id", productCtrl.getProduct);
router.post(
	"/product",
	authenticateToken,
	upload.array("images"),
	productCtrl.createProduct
);

module.exports = router;
