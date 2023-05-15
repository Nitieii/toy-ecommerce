const mongoose = require("mongoose");

const Order = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		products: [
			{
				product: {
					type: mongoose.Schema.ObjectId,
					ref: "Product",
					required: [true, "Product is required"],
				},
				quantity: {
					type: Number,
					required: [true, "Quantity is required"],
					default: 1,
				},
			},
		],
		status: {
			type: String,
			enum: ["pending", "paid"],
			default: "pending",
		},
		totalCost: {
			type: Number,
			required: [true, "Total cost is required"],
			default: 0.0,
		},
		shippingAddress: {
			type: String,
			required: [true, "Shipping address is required"],
		},
		phone: {
			type: String,
			required: [true, "Phone is required"],
			match: [
				/^(0[3|5|7|8|9])+([0-9]{8})$/,
				"Please provide a valid phone number",
			],
		},
	},
	{ timestamps: true }
);

// Populate the user field
Order.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name email",
	});
	next();
});

// Populate the products field
Order.pre(/^find/, function (next) {
	this.populate({
		path: "products.product",
		select: "name price",
	});
	next();
});

// Calculate the total cost of the order, and empty the cart
Order.pre("save", async function (next) {
	let totalCost = 0;

	this.products.forEach((product) => {
		totalCost += product.product.price * product.quantity;
	});

	this.totalCost = totalCost;

	const Cart = require("./Cart");

	// Empty the cart after creating an order
	const cart = await Cart.findOne({ user: this.user });

	if (!cart) {
		throw new Error("Cart does not exist");
	}

	cart.products = [];
	await cart.save();

	next();
});

module.exports = mongoose.model("Order", Order);
