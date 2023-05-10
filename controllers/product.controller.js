const mongoose = require("mongoose");

const { Product } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");

const getAllProducts = catchAsync(async (req, res) => {
	const page = req.query.page;

	//
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
	let product = await Product.findById(req.params.id);

	if (!product) {
		throw new Error("Product does not exist");
	}

	return res.send({
		status: "success",
		product,
	});
});

module.exports = {
	getAllProducts,
	getProduct,
};
