const jwt = require("jsonwebtoken");
const { User } = require("#models");
const { catchAsync } = require("#utils");

const authenticateToken = catchAsync(async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) throw new Error("Token does not exist");

	jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
		if (err) throw new Error("Token is invalid");

		const userInfo = await User.findById(user.id);

		if (!userInfo) next(new Error("User does not exist"));

		req.user = userInfo;
		next();
	});
});

module.exports = authenticateToken;
