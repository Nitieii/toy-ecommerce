const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
	{
		token: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
