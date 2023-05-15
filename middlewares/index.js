module.exports = {
	// authentication
	authenticateToken: require("./authentication/authenticateToken"),
	authenticateAdmin: require("./authentication/authenticateAdmin"),

	// request validation
	productRequestValidation: require("./validation/productRequest.validation"),

	errorHandler: require("./errorHandler"),
};
