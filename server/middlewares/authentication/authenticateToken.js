const jwt = require("jsonwebtoken");
const { User } = require("#models");
const { catchAsync } = require("#utils");

const authenticateToken = catchAsync(async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token)
		return res.status(401).send({
			status: "error",
			message: "Token is missing",
		});

	jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
		if (err)
			return res.status(403).send({
				status: "error",
				message: "Invalid token",
			});

		const userInfo = await User.findById(user.id);

		if (!userInfo)
			return res.status(401).send({
				status: "error",
				message: "User does not exist",
			});

		req.user = userInfo;

		next();
	});
});

module.exports = authenticateToken;
