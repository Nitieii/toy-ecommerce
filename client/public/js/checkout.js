const subTotal = document.getElementById("sub-total-price");
const total = document.getElementById("total-price");

var totalPurchase;

$(document).ready(function () {
    var fullname = document.getElementById("full_name");
    fullname.value = localStorage.getItem("username");

    var email = document.getElementById("email");
    email.value = localStorage.getItem("email");

    getCartByID();
});

async function getCartByID() {
    await axios
        .get(
            `http://localhost:8000/api/carts/${localStorage.getItem(
                "cart_id"
            )}`,
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token"),
                },
            }
        )
        .then((response) => {
            cart = response.data;
            totalPurchase = cart.total;

            // Convert total purchase to
            subTotal.innerHTML = totalPurchase.toLocaleString();
            total.innerHTML = totalPurchase.toLocaleString();
        });
}

function createOrder(cart_id) {
    // Get the checkout information
    try {
        $("body").toggleClass("loading");

        var address = document.getElementById("address").value;
        var phone_number = document.getElementById("phone_number").value;
        var note = document.getElementById("comment").value;

        // Validate the phone number
        var phonenumberRegex =
            /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;

        if (!phonenumberRegex.test(phone_number)) {
            alert("Please enter a valid phone number");
            $("body").toggleClass("loading");
            return;
        }

        // create order json
        const order = {
            address: address,
            phone_number: phone_number,
            note: note,
            total: totalPurchase,
            user_id: localStorage.getItem("user_id"),
            cart_id: localStorage.getItem("cart_id"),
        };

        // create order
        axios({
            url: "http://localhost:8000/api/orders",

            method: "POST",
            data: order,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        }).then((response) => {
            $("body").toggleClass("loading");

            alert(
                "Order created successfully! We received your order, and we will confirm the order as soon as possible."
            );
        });
    } catch (error) {
        $("body").toggleClass("loading");
        console.log(error);
    }
}
