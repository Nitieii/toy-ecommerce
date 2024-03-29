const mongoose = require("mongoose");
const Cart = require("./Cart");
const Order = require("./Order");

const User = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, "Full name is required"],
			trim: true,
			maxLength: [100, "Full name cannot exceed 100 characters"],
			match: [/^[a-zA-Z ]+$/, "Please provide a valid full name"],
		},
		email: {
			type: String,
			unique: [true, "Email already exists"],
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
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// When user is created, crete cart for the user

User.pre("save", async function (next) {
	await Cart.create({ user: this._id });

	next();
});

// If user is find by id and delete, delete cart, orders of the user
User.pre("findOneAndDelete", async function (next) {
	const user = await this.model.findOne(this.getQuery());

	await Cart.findOneAndDelete({ user: user._id });

	await Order.deleteMany({ user: user._id });

	next();
});

module.exports = mongoose.model("User", User);
