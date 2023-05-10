const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);
