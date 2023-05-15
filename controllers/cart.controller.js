const mongoose = require("mongoose");

const { Cart } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");

const getAllCarts = catchAsync(async (req, res) => {
	try {
		const page = req.query.page;

		const carts = await Cart.aggregate().facet({
			...calLengthPage("totalLength"),
			carts: [{ $sort: { _id: -1 } }, ...paginate(page)],
		});

		if (carts[0].carts.length === 0) {
			return res.send({
				status: "success",
				carts: [],
				totalPage: 0,
				totalLenght: 0,
			});
		}

		return res.send({
			status: "success",
			carts: carts[0].carts,
			totalPage: carts[0].totalLength[0].totalPage,
			totalLength: carts[0].totalLength[0].totalLength,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const getCart = catchAsync(async (req, res) => {
	try {
		const { user } = req;

		const cart = await Cart.findOne({ user: user.id });

		if (!cart) {
			throw new Error("Cart does not exist");
		}

		return res.send({
			status: "success",
			cart: {
				...cart.toObject(),
				totalPrice: cart.totalPrice,
			},
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const createCart = catchAsync(async (req, res) => {
	try {
		const { user } = req;

		// Create a new cart using the provided data
		const cart = await Cart.create({
			user: user.id,
		});

		return res.send({
			status: "success",
			cart,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const addToCart = catchAsync(async (req, res) => {
	try {
		const { productId, quantity } = req.body;

		const { user } = req;

		// Find the cart of the user
		const cart = await Cart.findOne({ user: user.id });

		// Check if the cart exists
		if (!cart) {
			// If the cart does not exist, throw an error
			return res.send({
				status: "error",
				message: "Cart does not exist",
			});
		}

		// Check if the product is already in the cart
		const productIndex = cart.products.findIndex(
			(product) => product.product.toString() === productId
		);

		// If the product is already in the cart
		if (productIndex !== -1) {
			// Increase the quantity of the product
			cart.products[productIndex].quantity += quantity;
		} else {
			// Add the product to the cart
			cart.products.push({ product: productId, quantity });
		}

		// Save the cart
		await cart.save();

		// Return the cart
		return res.send({
			status: "success",
			cart,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const updateCart = catchAsync(async (req, res) => {
	try {
		const { productId, quantity } = req.body;

		const { user } = req;

		// Find the cart of the user
		const cart = await Cart.findOne({ user: user.id });

		// Check if the cart exists
		if (!cart) {
			// If the cart does not exist, throw an error
			return res.send({
				status: "error",
				message: "Cart does not exist",
			});
		}

		// Check if the product is already in the cart
		const productIndex = cart.products.findIndex(
			(product) => product.product._id.toString() === productId
		);

		// If the product is already in the cart
		if (productIndex !== -1) {
			// Update the quantity of the product
			cart.products[productIndex].quantity = quantity;
		}

		// Save the cart
		await cart.save();

		// Return the cart
		return res.send({
			status: "success",
			cart,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const deleteCartItem = catchAsync(async (req, res) => {
	try {
		const { productId } = req.body;

		const { user } = req;

		// Find the cart of the user
		const cart = await Cart.findOne({ user: user.id });

		// Check if the cart exists
		if (!cart) {
			// If the cart does not exist, throw an error
			return res.send({
				status: "error",
				message: "Cart does not exist",
			});
		}

		// Check if the product is already in the cart
		const productIndex = cart.products.findIndex(
			(product) => product.product._id.toString() === productId
		);

		// If the product is already in the cart
		if (productIndex !== -1) {
			// Remove the product from the cart
			cart.products.splice(productIndex, 1);
		}

		// Save the cart
		await cart.save();

		// Return the cart
		return res.send({
			status: "success",
			cart,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const deleteCart = catchAsync(async (req, res) => {
	try {
		const { cartId } = req.params;

		// Find the cart of the user
		const cart = await Cart.findByIdAndDelete(cartId);

		// Check if the cart exists
		if (!cart) {
			// If the cart does not exist, throw an error
			return res.send({
				status: "error",
				message: "Cart does not exist",
			});
		}

		// Return the cart
		return res.send({
			status: "success",
			message: "Cart deleted successfully",
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

module.exports = {
	getAllCarts,
	getCart,
	createCart,
	addToCart,
	updateCart,
	deleteCartItem,
	deleteCart,
};
