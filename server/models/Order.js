const mongoose = require("mongoose");
const Cart = require("./Cart");
const Product = require("./Product");

const Order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"]
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Product is required"]
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          default: 1
        }
      }
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending"
    },
    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
      default: 0.0
    },
    shippingAddress: {
      type: String,
      required: [true, "Shipping address is required"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [
        /^(0[3|5|7|8|9])+([0-9]{8})$/,
        "Please provide a valid phone number"
      ]
    }
  },
  { timestamps: true }
);

// Empty the cart when the order is created
Order.pre("save", async function(next) {
  // Empty the cart after creating an order
  const cart = await Cart.findOne({ user: this.user });

  if (!cart) {
    throw new Error("Cart does not exist");
  }

  next();
});


// Populate the product field
Order.pre(/^find/, function(next) {
  this.populate({
    path: "products.product",
    select: "name price images category"
  });

  next();
});


module.exports = mongoose.model("Order", Order);
