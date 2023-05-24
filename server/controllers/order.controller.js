const { Order, Cart } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");

const getAllOrders = catchAsync(async (req, res) => {
  try {
    const { page } = req.query;

    const orders = await Order.aggregate().facet({
      ...calLengthPage("totalLength"),
      orders: [{ $sort: { _id: -1 } }, ...paginate(page)]
    });

    if (orders[0].orders.length === 0) {
      return res.send({
        status: "success",
        orders: [],
        totalPage: 0,
        totalLength: 0
      });
    }

    return res.send({
      status: "success",
      orders: orders[0].orders,
      totalPage: orders[0].totalLength[0].totalPage,
      totalLength: orders[0].totalLength[0].totalLength
    });
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
      order
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      message: error.message
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
      quantity: product.quantity
    }));

    const order = await Order.create({
      user: user.id,
      products,
      shippingAddress,
      phone
    });

    return res.send({
      status: "success",
      message: `Order created successfully`,
      order
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
      message: `Order confirmed successfully`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  confirmOrder
};
