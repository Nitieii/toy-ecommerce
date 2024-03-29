const { Order, Cart, Product } = require("#models");
const { paginate, calLengthPage } = require("#services/mongoose.services");
const { catchAsync } = require("#utils");

const getAllOrders = catchAsync(async (req, res) => {
  try {
    const { page } = req.query;

    const orders = await Order.aggregate().facet({
      ...calLengthPage("totalLength"), orders: [{ $sort: { _id: -1 } }, ...paginate(page)]
    });

    if (orders[0].orders.length === 0) {
      return res.send({
        status: "success", orders: [], totalPage: 0, totalLength: 0
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

const getUserOrders = catchAsync(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ _id: -1 });

    if (orders.length === 0) {
      return res.send({
        status: "success", orders: [], totalPage: 0, totalLength: 0
      });
    }

    return res.send({
      status: "success", orders, totalLength: orders.length, totalPage: 1
    });
  } catch (error) {
    return res.send({
      status: "error", message: error.message
    });
  }
});

const getOrder = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.send({
        status: "error", message: "Order does not exist"
      });
    }

    return res.send({
      status: "success", order
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error", message: error.message
    });
  }
});

const createOrder = catchAsync(async (req, res) => {
  try {
    const { user } = req;

    const cart = await Cart.findOne({ user: user.id });

    if (!cart) {
      return res.send({
        status: "error", message: "Cart does not exist"
      });
    }

    const { shippingAddress, phone, totalCost } = req.body;

    const cartProducts = cart.products;
    const products = cartProducts.map(product => ({
      product: product.product._id, quantity: product.quantity
    }));

    const newOrder = {
      user: user.id, products, shippingAddress, phone, totalCost
    };

    await Order.create(newOrder);

    // Empty user cart
    await Cart.findOneAndUpdate({ user: user.id }, { products: [] });

    return res.send({
      status: "success", message: `Order created successfully`
    });
  } catch (error) {
    return res.send({
      status: "error", message: error.message
    });
  }
});

const confirmOrder = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    // if order is already confirmed, throw an error
    const order = await Order.findById(id);

    if (!order) {
      return res.send({
        status: "error", message: "Order does not exist"
      });
    }

    if (order.status === "confirmed") {
      return res.send({
        status: "error", message: "Order is already confirmed"
      });
    }

    // Update the order status to confirmed
    order.status = "confirmed";
    await order.save();

    // Update all the products quantity in the order to the current quantity - the quantity in the order
    const products = order.products;

    products.forEach(async product => {
      const currentProduct = await Product.findById(product.product._id);

      // Check if the product is still available
      if (currentProduct.quantity < product.quantity) {
        return res.send({
          status: "error", message: `${currentProduct.name} is out of stock`
        });
      }

      await Product.findByIdAndUpdate(product.product._id, {
        quantity: currentProduct.quantity - product.quantity
      });
    });

    return res.send({
      status: "success", message: `Order confirmed successfully`
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllOrders, getOrder, createOrder, confirmOrder, getUserOrders
};
