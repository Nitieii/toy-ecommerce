module.exports = {
	// authentication
	authenticateToken: require("./authentication/authenticateToken"),
	authenticateAdmin: require("./authentication/authenticateAdmin"),

	errorHandler: require("./errorHandler"),
};
