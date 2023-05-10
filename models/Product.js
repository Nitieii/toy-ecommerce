const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
			maxLength: [100, "Product name cannot exceed 100 characters"],
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

// Query middleware
productSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name email",
	});
	next();
});

module.exports = mongoose.model("Product", productSchema);
