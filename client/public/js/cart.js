let subTotalPrice = document.querySelector("#sub-total-price");
let totalPrice = document.querySelector("#total-price");

window.onload = onLoad;

function onLoad() {
    const quantities = document.querySelectorAll(".qty-text");
    const prices = document.querySelectorAll(".price");

    for (let i = 0; i < quantities.length; i++) {
        totalPrice.innerHTML =
            parseInt(totalPrice.innerHTML) +
            parseInt(quantities[i].value) *
                parseInt(prices[i].children.item(0).innerHTML);
    }

    totalPrice.innerHTML = parseInt(totalPrice.innerHTML).toLocaleString();
    subTotalPrice.innerHTML = totalPrice.innerHTML;
}

function updateProductQuantity(event) {
    let currentRow =
        event.target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    let currentRowId = currentRow.id;

    const currentItemPrice = currentRow.children
        .item(2)
        .children.item(0).innerHTML;

    // Check which button is clicked (+ or -)
    if (event.target.classList.contains("fa-plus")) {
        // Quantity num is before the plus icon
        const currentItemQuantity =
            event.target.parentElement.previousElementSibling;
        currentItemQuantity.value++;

        updateTotalPrice(parseInt(currentItemPrice), "plus");
        updateCartDB(currentRowId, currentItemQuantity, "update");
    } else if (event.target.classList.contains("fa-minus")) {
        // Quantity num is after the minus icon
        const currentItemQuantity =
            event.target.parentElement.nextElementSibling;

        // Delete item from cart if the quantity is 0
        if (currentItemQuantity.value == 1) {
            let confirmDelete = confirm(
                "Are you sure you want to delete the item from the cart?"
            );

            if (confirmDelete) {
                axios({
                    url: `http://localhost:8000/api/cartItem/31`,
                    method: "DELETE",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("access_token"),
                    },
                });
                currentRow.remove();
                updateCartDB(currentRowId, 0, "remove");
            }
        } else if (currentItemQuantity.value > 1) {
            currentItemQuantity.value--;
        }

        updateTotalPrice(parseInt(currentItemPrice), "minus");
        updateCartDB(currentRowId, currentItemQuantity, "update");
    }
}

function updateCartDB(cartItemId, updatedQuantity) {
    let updateItemJson = {
        cartItem_id: localStorage.getItem("cart_id"),
        product_id: "",
        quantity: updatedQuantity.value,
    };

    axios({
        url: "http://localhost:8000/api/carts/23",
        method: "PUT",
        data: updateItemJson,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
    });
}

function updateTotalPrice(price, flag) {
    let currentPrice = parseFloat(
        totalPrice.innerHTML.replace(/[^0-9-.]/g, "")
    );

    if (flag == "plus") {
        totalPrice.innerHTML = (currentPrice + price).toLocaleString();
    } else {
        totalPrice.innerHTML = (currentPrice - price).toLocaleString();
    }

    subTotalPrice.innerHTML = totalPrice.innerHTML;
}

let tbody = document.querySelector("tbody");
tbody.addEventListener("click", updateProductQuantity);

function checkout() {
    let confirmCheckout = confirm("Are you sure you want to checkout?");
    if (confirmCheckout) {
        window.location.href = "checkout.php?total=" + totalPrice.innerHTML;
    }
}
