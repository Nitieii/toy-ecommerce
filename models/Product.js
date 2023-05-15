const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
			maxLength: [100, "Product name cannot exceed 100 characters"],
			unique: true,
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
			maxLength: [5, "Product price cannot exceed 5 characters"],
			default: 0.0,
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
		},
		quantity: {
			type: Number,
			required: [true, "Product quantity is required"],
			default: 0,
			min: [0, "Product quantity cannot be less than 0"],
			// check if quantity is a valid integer
			validate: {
				validator: Number.isInteger,
				message: "{VALUE} is not an integer value",
			},
		},
		ratings: {
			type: Number,
			default: 0,
		},
		images: [
			{
				type: String,
				default: "http://www.sitech.co.id/assets/img/products/default.jpg",
			},
		],
		category: {
			type: String,
			required: [true, "Product category is required"],
			enum: {
				values: ["Puzzles", "Sensory", "Food", "Ride-on", "Building", "Others"],
				message:
					"Please select those categories for the product: Puzzles, Sensory, Food, Ride-on, Building, Others",
			},
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
	{
		timestamps: true,
	}
);

// If product is find by id and delete, delete cart item of the product
productSchema.pre("findOneAndDelete", async function (next) {
	const { Cart } = require("#models");

	const product = await this.model.findOne(this.getQuery());

	await Cart.updateMany(
		{ "cartItems.product": product._id },
		{ $pull: { cartItems: { product: product._id } } }
	);

	next();
});

module.exports = mongoose.model("Product", productSchema);
