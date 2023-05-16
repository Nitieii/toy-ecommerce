const mongoose = require("mongoose");

const User = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, "Full name is required"],
			trim: true,
			maxLength: [100, "Full name cannot exceed 100 characters"],
			match: [/^[A-Za-z ]+$/],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
			trim: true,
			maxLength: [100, "Email cannot exceed 100 characters"],
			match: [
				/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				"Please provide a valid email",
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			maxLength: [100, "Password cannot exceed 100 characters"],
			match: [
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
				"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
			],
		},
		image_url: {
			type: String,
			default:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU",
		},
		is_admin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// If user is find by id and delete, delete cart, orders of the user
User.pre("findOneAndDelete", async function (next) {
	const { Cart, Order } = require("#models");

	const user = await this.model.findOne(this.getQuery());

	await Cart.findOneAndDelete({ user: user._id });

	await Order.deleteMany({ user: user._id });

	next();
});

// If user is created, create cart for the user
User.post("save", async function (doc, next) {
	await this.model("Cart").create({ user: this._id });

	next();
});

module.exports = mongoose.model("User", User);
