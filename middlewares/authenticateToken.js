const jwt = require("jsonwebtoken");
const { User } = require("#models");
const { catchAsync } = require("#utils");

const authenticateToken = catchAsync(async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) throw new Error("Token does not exist");

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
		if (err) next(err);
		const user = await User.findById(user.id);
		if (!user) next(new Error("User does not exist"));
		req.user = user;
		next();
	});
});

module.exports = authenticateToken;
