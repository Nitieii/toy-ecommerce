const errorHandler = (err, req, res, _next) => {
	console.log(err);
	return res.send({
		status: "error",
		message: err.message,
	});
};

module.exports = errorHandler;
