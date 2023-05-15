const { catchAsync } = require("#utils");

const authenticateAdmin = catchAsync(async (req, res, next) => {
	// Check if user is admin
	if (req.user.is_admin !== true) {
		// If user is not an admin, return a 403 error
		return res.status(403).send({
			status: "error",
			message: "You are not authorized to access this resource",
		});
	}

	next();
});

module.exports = authenticateAdmin;
