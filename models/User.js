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

module.exports = mongoose.model("User", User);
