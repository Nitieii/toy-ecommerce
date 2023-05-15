const mongoose = require("mongoose");
const fs = require("fs");

const { Product } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");
const { uploadFiles, deleteFiles } = require("#services/fileS3.services");

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
		const { name, price, description, category, quantity, ratings } = req.body;

		// Create a new product using the provided data
		const product = await Product.create({
			name,
			price,
			description,
			category,
			quantity,
			ratings,
		});

		// Upload each image file to the "products" directory on the server
		const uploadPromises = req.files.map(async (file) => {
			try {
				await uploadFiles(file, "products/");
				await fs.promises.unlink(file.path);
				return `https://toy-ecommerce.s3.amazonaws.com/products/${file.originalname}`;
			} catch (error) {
				console.error(error);
				return null;
			}
		});

		const uploadResults = await Promise.allSettled(uploadPromises);

		const images = uploadResults
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

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

const updateProduct = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { keptImages } = req.body;
	const { files } = req;

	try {
		const product = await Product.findById(id);

		if (!product) {
			throw new Error("Product does not exist");
		}

		if (files && files.length > 0) {
			const uploadPromises = files.map(async (file) => {
				await uploadFiles(file, "products/");
				await fs.promises.unlink(file.path);
				return `https://toy-ecommerce.s3.amazonaws.com/products/${file.originalname}`;
			});

			const uploadImages = await Promise.all(uploadPromises);

			const imagesToDelete = keptImages
				? product.images.filter((image) => !keptImages.includes(image))
				: product.images;

			await deleteFiles(imagesToDelete, "products/");

			product.images = keptImages
				? [...keptImages, ...uploadImages]
				: uploadImages;
		} else if (keptImages) {
			const imagesToDelete = product.images.filter(
				(image) => !keptImages.includes(image)
			);

			await deleteFiles(imagesToDelete, "products/");

			product.images = keptImages;
		}

		Object.keys(req.body).map((field) => {
			if (field !== "keptImages" && field !== "images") {
				product[field] = req.body[field];
			}
		});

		await product.save();

		return res.send({
			status: "success",
			message: `Product updated successfully`,
			product,
		});
	} catch (error) {
		return res.send({ status: "error", message: error.message });
	}
});

const deleteProduct = catchAsync(async (req, res) => {
	try {
		// Get the product ID from the request parameters
		const { id } = req.params;

		// Delete the product images from the server
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			// If the product does not exist, return a 404 error
			return res.status(404).send({
				status: "error",
				message: "Product not found",
			});
		}

		await deleteFiles(product.images, "products/");

		// Return a success response
		return res.send({
			status: "success",
			message: `Product deleted successfully`,
		});
	} catch (error) {
		// If an error occurs, return an error response with the error message
		return res.send({ status: "error", message: error.message });
	}
});

const searchProducts = catchAsync(async (req, res) => {
	try {
		// Get the search query from the request query string
		const { query, page } = req.query;

		// Create a regular expression from the search query
		const searchRegex = new RegExp(query, "i");

		// Find all products that match the search query
		const products = await Product.aggregate([
			{
				$match: {
					$or: [
						{ name: { $regex: searchRegex } },
						{ description: { $regex: searchRegex } },
					],
				},
			},
		]).facet({
			...calLengthPage("totalLength"),
			products: [{ $sort: { _id: -1 } }, ...paginate(page)],
		});

		// If no products match the search query, return an empty response
		if (products[0].products.length === 0) {
			return res.send({
				status: "success",
				products: [],
				totalPage: 0,
				totalLenght: 0,
			});
		}

		// Return a success response with all matching products
		return res.send({
			status: "success",
			products: products[0].products,
			totalPage: products[0].totalLength[0].totalPage,
			totalLength: products[0].totalLength[0].totalLength,
		});
	} catch (error) {
		return res.send({ status: "error", message: error.message });
	}
});

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	searchProducts,
};
