const { catchAsync } = require("#utils");

const productRequestValidation = catchAsync(async (req, res, next) => {
	// Get data from the request body
	const { name, price, description, category } = req.body;

	// Validate the input data
	if (!name || !price || !description || !category) {
		// If required data is missing, throw an error
		return res.send({
			status: "error",
			message: "Please provide all required data",
		});
	} else if (!req.files || req.files.length === 0 || req.files.length > 5) {
		// If there are no images or too many images, throw an error
		return res.send({
			status: "error",
			message: "Please provide at least one image and no more than five images",
		});
	}

	// Check the mimetype of each image file
	req.files.forEach(async (image) => {
		if (
			image.mimetype !== "image/jpg" &&
			image.mimetype !== "image/jpeg" &&
			image.mimetype !== "image/png"
		) {
			// If an image file has an invalid mimetype, throw an error
			return res.send({
				status: "error",
				message: "Please provide only JPG, JPEG, or PNG images",
			});
		}
	});

	next();
});

module.exports = productRequestValidation;
