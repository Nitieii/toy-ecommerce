module.exports = {
	// authentication
	authenticateToken: require("./authentication/authenticateToken"),
	authenticateAdmin: require("./authentication/authenticateAdmin"),

	// request validation
	productRequestValidation: require("./validation/productRequest.validation"),
	cartRequestValidation: require("./validation/cartRequest.validation"),

	errorHandler: require("./errorHandler"),
};
