const { catchAsync } = require("#utils");
const mongoose = require("mongoose");
const { Product } = require("#models");

const cartRequestValidation = catchAsync(async (req, res, next) => {
	// Get data from the request body
	const { productId, quantity } = req.body;

	// Validate the input data
	if (!productId || !quantity) {
		// If required data is missing, throw an error
		return res.send({
			status: "error",
			message: "Please provide all required data",
		});
	}

	// Check if the product ID is a valid MongoDB ID
	if (!mongoose.isValidObjectId(productId)) {
		// If the product ID is not a valid MongoDB ID, throw an error
		return res.send({
			status: "error",
			message: "Please provide a valid product ID",
		});
	}

	// Check if the product exist
	const product = await Product.findById(productId);

	if (!product) {
		// If the product does not exist, throw an error
		return res.send({
			status: "error",
			message: "Product does not exist",
		});
	}

	// Check if the quantity is a number
	if (typeof quantity !== "number") {
		// If the quantity is not a number, throw an error
		return res.send({
			status: "error",
			message: "Please provide a number for the quantity",
		});
	} else if (quantity <= 0 || !Number.isInteger(quantity)) {
		// Check if the quantity is a positive integer number
		return res.send({
			status: "error",
			message: "Please provide a valid number for the quantity",
		});
	}
	// Check if the quantity does not exceed the available quantity of the product
	if (quantity > product.quantity) {
		// If the quantity exceeds the available quantity of the product, throw an error
		return res.send({
			status: "error",
			message: "Quantity exceeds the available quantity of the product",
		});
	}

	next();
});

module.exports = cartRequestValidation;
