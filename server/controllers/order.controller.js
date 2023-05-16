const { Order, Cart } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");

const getAllOrdersWithoutLimit = catchAsync(async (req, res) => {
	try {
		const orders = await Order.find();
		return res.status(200).json({ orders });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const getOrder = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id);

		if (!order) {
			throw new Error("Order does not exist");
		}

		return res.send({
			status: "success",
			order,
		});
	} catch (error) {
		console.log(error);
		return res.send({
			status: "error",
			message: error.message,
		});
	}
});

const createOrder = catchAsync(async (req, res) => {
	try {
		const { user, cartId } = req;

		const { shippingAddress, phone } = req.body;

		// Get products from cart
		const cart = await Cart.findById(cartId);

		if (!cart) {
			throw new Error("Cart does not exist");
		}

		const products = cart.products.map((product) => ({
			product: product.product,
			quantity: product.quantity,
		}));

		const order = await Order.create({
			user: user.id,
			products,
			shippingAddress,
			phone,
		});

		return res.send({
			status: "success",
			message: `Order created successfully`,
			order,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

const confirmOrder = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;

		await Order.findByIdAndUpdate(id, { status: "confirmed" });

		return res.send({
			status: "success",
			message: `Order confirmed successfully`,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = {
	getAllOrdersWithoutLimit,
	getOrder,
	createOrder,
	confirmOrder,
};
