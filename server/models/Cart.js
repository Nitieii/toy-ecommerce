const mongoose = require("mongoose");
const Product = require("./Product");

const Cart = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: [true, "User already has a cart"]
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
          default: 1,
          min: [1, "Quantity cannot be less than 1"],
          // Check if the quantity does not exceed the available quantity of the product
          validate: {
            validator: async function(value) {
              const product = await Product.findById(
                this.product
              );

              return value <= product.quantity;
            }
          }
        }
      }
    ]
  },
  { timestamps: true }
);

// Populate the user field
Cart.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name email"
  });

  next();
});

// Populate the product field
Cart.pre(/^find/, function(next) {
  this.populate({
    path: "products.product",
    select: "name price images category"
  });

  next();
});

// Calculate the total price of the cart
Cart.virtual("totalPrice").get(function() {
  return this.products.reduce((total, product) => {
    return total + product.product.price * product.quantity;
  }, 0);
});

module.exports = mongoose.model("Cart", Cart);
