const mongoose = require("mongoose");
const fs = require("fs");

const { Product } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");
const { uploadFiles } = require("#middlewares/uploadImgs");

const getAllProducts = catchAsync(async (req, res) => {
	const page = req.query.page;

	const products = await Product.aggregate().facet({
		...calLengthPage("totalLength"),
		products: [{ $sort: { _id: -1 } }, ...paginate(page)],
	});

	if (products[0].products.length === 0) {
		return res.send({
			status: "success",
			products: [],
			totalPage: 0,
			totalLenght: 0,
		});
	}

	return res.send({
		status: "success",
		products: products[0].products,
		totalPage: products[0].totalLength[0].totalPage,
		totalLength: products[0].totalLength[0].totalLength,
	});
});

const getProduct = catchAsync(async (req, res) => {
	const { id } = req.params;

	const mongooseId = new mongoose.Types.ObjectId(id);

	let product = await Product.findById(mongooseId);

	if (!product) {
		throw new Error("Product does not exist");
	}

	return res.send({
		status: "success",
		product,
	});
});

const createProduct = catchAsync(async (req, res) => {
	try {
		// Check if user is admin
		if (req.user.is_admin !== true) {
			// If user is not an admin, return a 403 error
			return res.status(403).send({
				status: "error",
				message: "You are not authorized to access this resource",
			});
		}

		// Get data from the request body
		const { name, price, description, category, ratings } = req.body;

		// Validate the input data
		if (!name || !price || !description || !category) {
			// If required data is missing, throw an error
			throw new Error("Please provide all required fields");
		} else if (!req.files || req.files.length === 0 || req.files.length > 5) {
			// If there are no images or too many images, throw an error
			throw new Error(
				"Please provide at least 1 image and no more than 5 images"
			);
		}

		// Check the mimetype of each image file
		req.files.forEach(async (image) => {
			if (
				image.mimetype !== "image/jpg" &&
				image.mimetype !== "image/jpeg" &&
				image.mimetype !== "image/png"
			) {
				// If an image file has an invalid mimetype, throw an error
				throw new Error(
					"Please provide images with extension jpg, jpeg, or png"
				);
			}
		});

		// Create a new product using the provided data
		const product = await Product.create({
			name,
			price,
			description,
			category,
			ratings,
		});

		// Upload each image file to the "products" directory on the server
		const uploadPromises = req.files.map(async (file) => {
			await uploadFiles(file, "products/");
			await fs.promises.unlink(file.path);
			return (
				"https://toy-ecommerce.s3.amazonaws.com/products/" + file.originalname
			);
		});

		const images = await Promise.all(uploadPromises);

		// Add the images array to the product object
		product.images = images;

		// Save the product to the database
		await product.save();

		// Return a success response with the new product object
		return res.send({
			status: "success",
			message: `Product created successfully`,
			product,
		});
	} catch (error) {
		// If an error occurs, return an error response with the error message
		return res.send({ status: "error", message: error.message });
	}
});

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
};
