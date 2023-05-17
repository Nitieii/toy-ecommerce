function confirmOrder(order_id) {
  // Check if the product quantity is available
  $.ajax({
    url: "order-confirm-action.php",
    type: "POST",
    data: { method: "checkQuantity", order_id: order_id },
    success: function (data) {
      if (
        data ==
        "The current confirm product quantity exceeds the available product quantity. Please check again."
      ) {
        alert(data);
      } else {
        // Confirm the order
        $.ajax({
          url: "order-confirm-action.php",
          type: "POST",
          data: { method: "confirmOrder", order_id: order_id },
          success: function (data) {
            if (data == "Order confirmed successfully.") {
              // After confirming the order, update the product quantity
              $.ajax({
                url: "order-confirm-action.php",
                type: "POST",
                data: { method: "updateQuantity", order_id: order_id },
                success: function (data) {
                  // Empty the cart
                  $.ajax({
                    url: "order-confirm-action.php",
                    type: "POST",
                    data: { method: "emptyCart", order_id: order_id },
                    success: function (data) {
                      alert("Confirm order successfully!");
                      location.reload();
                    },
                  });
                },
              });
            }
          },
        });
      }
    },
  });
}
