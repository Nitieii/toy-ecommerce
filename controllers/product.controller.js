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
		const { name, price, description, category, ratings } = req.body;

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

const updateProduct = catchAsync(async (req, res) => {
	try {
		// Get the product ID from the request parameters
		const { id } = req.params;

		// Find the product with the provided ID
		const product = await Product.findById(id);

		// If the product does not exist, throw an error
		if (!product) {
			return res.send({
				status: "error",
				message: "Product does not exist",
			});
		}

		const { keptImages } = req.body;

		// If the user uploaded new images and edit the old ones
		if (req.files && req.files.length > 0) {
			// Create an empty array to store the new image locations
			const uploadPromises = req.files.map(async (file) => {
				await uploadFiles(file, "products/");
				await fs.promises.unlink(file.path);
				return (
					"https://toy-ecommerce.s3.amazonaws.com/products/" + file.originalname
				);
			});

			const uploadImages = await Promise.all(uploadPromises);

			//
			if (keptImages.length > 0) {
				// Compare the old images with the kept images
				const imagesToDelete = product.images.filter(
					(image) => !keptImages.includes(image)
				);

				// Delete the old images from the server
				await deleteFiles(imagesToDelete, "products/");

				// Add the new images to the product object
				product.images = [...keptImages, ...uploadImages];
			} else {
				// Delete the old images from the server
				await deleteFiles(product.images, "products/");

				// Add the new images to the product object
				product.images = uploadImages;
			}
		} // If the user did not upload new images, and only edit the old ones
		else if (keptImages) {
			// Compare the old images with the kept images
			const imagesToDelete = product.images.filter(
				(image) => !keptImages.includes(image)
			);

			// Delete the old images from the server
			await deleteFiles(imagesToDelete, "products/");

			// Add the new images to the product object
			product.images = keptImages;
		}

		// Only Update the product field with the new data from the request body
		const fieldsToUpdate = Object.keys(req.body);

		fieldsToUpdate.forEach((field) => {
			if (field !== "keptImages" && field !== "images") {
				product[field] = req.body[field];
			}
		});

		// Save the updated product to the database
		await product.save();

		// Return a success response with the updated product object
		return res.send({
			status: "success",
			message: `Product updated successfully`,
			product,
		});

		// If an error occurs, return an error response with the error message
	} catch (error) {
		return res.send({ status: "error", message: error.message });
	}
});

const deleteProduct = catchAsync(async (req, res) => {
	try {
		// Check if user is admin
		if (req.user.is_admin !== true) {
			// If user is not an admin, return a 403 error
			return res.status(403).send({
				status: "error",
				message: "You are not authorized to access this resource",
			});
		}

		// Get the product ID from the request parameters
		const { id } = req.params;

		// Find the product with the provided ID
		const product = await Product.findById(id);

		// If the product does not exist, throw an error
		if (!product) {
			throw new Error("Product does not exist");
		}

		// Delete the product images from the server
		await deleteFiles(product.images, "products/");

		// Delete the product from the database
		await Product.findByIdAndDelete(id);

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

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
