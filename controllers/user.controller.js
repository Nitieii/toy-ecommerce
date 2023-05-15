const argon2 = require("argon2");
const mongoose = require("mongoose");

const { User } = require("#models");
const { catchAsync } = require("#utils");

const getAllUsersWithoutLimit = catchAsync(async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({ users });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const getUser = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;

		// Check if user is admin or user is updating his/her own account
		if (req.user.is_admin == false && req.user._id != id) {
			return res.send({
				status: "error",
				message: "You are not authorized to update this user",
			});
		}

		const mongooseId = new mongoose.Types.ObjectId(id);

		let user = await User.findById(mongooseId);

		if (!user) {
			return res.status(404).json({ message: "User does not exist" });
		}

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const createUser = catchAsync(async (req, res) => {
	try {
		const { fullname, email, password: plainTextPassword } = req.body;

		const password = await argon2.hash(plainTextPassword);

		const user = await User.create({ fullname, email, password });

		return res.send({
			status: "success",
			message: `User created successfully`,
			user,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const updateUser = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;

		// Check if user is admin or user is updating his/her own account
		if (req.user.is_admin == false && req.user._id != id) {
			return res.send({
				status: "error",
				message: "You are not authorized to update this user",
			});
		}

		// Check if user exists
		const user = await User.findById(id);

		if (!user) {
			return res.send({
				status: "error",
				message: "User not found",
			});
		}

		Object.keys(req.body).map((field) => {
			if (field !== "password" && field !== "is_admin") {
				user[field] = req.body[field];
			}
		});

		if (req.body.password) {
			const password = await argon2.hash(req.body.password);
			user.password = password;
		}

		if (req.body.is_admin && req.user.is_admin == true) {
			user.is_admin = req.body.is_admin;
		}

		await user.save();

		return res.send({
			status: "success",
			message: `User updated successfully`,
			user,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const deleteUser = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;

		// Check if user exists
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.send({
				status: "error",
				message: "User not found",
			});
		}

		return res.send({
			status: "success",
			message: `User deleted successfully`,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = {
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getAllUsersWithoutLimit,
};
