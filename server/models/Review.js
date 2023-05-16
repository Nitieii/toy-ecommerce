const mongoose = require("mongoose");

const Review = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: "Product",
			required: [true, "Product is required"],
		},
		rating: {
			type: Number,
			required: [true, "Rating is required"],
			min: [1, "Rating must be at least 1"],
			max: [5, "Rating must be at most 5"],
		},
		comment: {
			type: String,
			required: [true, "Comment is required"],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Review", Review);
