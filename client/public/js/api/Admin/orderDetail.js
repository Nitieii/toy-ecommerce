if (!localStorage.getItem("access_token")) {
    // Show logout button
    alert("You are not logged in. Please login to continue.");
    window.location.href = "http://localhost:8000/login";
}
// const token = localStorage.getItem('access-token')
var cardBody = document.querySelector("#card-body");
var productOrder = document.querySelector("#product-order-info");

getCartById()

$(document).ready(function () {
    // Get the id of the ordeer from the url
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);
    let is_confirmed = false;
    // If the id exists, get the product from the api
    if (id && id !== "order-detail-admin") {
        $("body").toggleClass("loading");
        try {
            axios
                .get(`http://localhost:8000/api/orders/${id}`, {
                    headers: {
                        "Authorization ": `Bearer` + localStorage.getItem("access_token"),
                    },
                })
                .then((response) => {
                    const order = response.data;
                    is_confirmed = order.is_confirmed;
                      const date = new Date(order.created_at);

                      const orderDate = date.toLocaleString();
                    // console.log(response);

                    var htmls = ` <div class="col"> <strong>Created at:</strong> <br>
                                    ${orderDate}
                                </div>
                                <div class="col"> <strong>Shipping TO:</strong> <br> ${
                                    order.address
                                }| <i class="fa fa-phone"></i>
                                    0333333 </div>
                                <div class="col"> <strong>Total: </strong> <br> $ ${(
                                    order.total / 1000
                                ).toFixed(3)}
                                </div>
                                <div class="col"> <strong>Status: </strong> <br>${
                                    order.is_confirmed === true
                                        ? "confirmed"
                                        : "not confirmed"
                                } </div>`;

                    // window.location.href = "users-admin";
                    cardBody.innerHTML = htmls
                    $("body").toggleClass("loading");
                })
                .catch((error) => {
                    $("body").toggleClass("loading");

                    if (error.response?.status === 404) {
                        alert("order not found");
                        window.location.href = "/orders-admin";
                    } else {
                        console.log(error);
                    }
                });
        } catch (error) {
            // if error code is 404, alert the user
            $("body").toggleClass("loading");
            if (error.response.status === 404) {
                alert("order not found");
            }
        }
    }
});

function getCartById(){
    try{
        axios.get(`http://localhost:8000/api/carts/${localStorage.getItem("cart_id")}`,
            {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            }
        ).then(function(response){
            cartItem = response.data.items
            for(var i=0; i<cartItem.length; i++){
                 var htmls = ` <li class="col-md-4">
                                <figure class="itemside mb-3">
                                    <div><img src="${cartItem[i].product.images[1].image_url}" class="img-sm rounded"></div>
                                    <figcaption class=" info align-self-center">
                                        <p class="title">${cartItem[i].product.name}</p> <span class="text-muted">$ 100 *10 = $ 10000</span>
                                        <span> </span>
                                    </figcaption>
                                </figure>
                            </li>`;

                 productOrder.innerHTML += htmls;

            }
           
            console.log(cartItem)
        });
    }catch(error){
        console.log(error)
    }
}

async function confirmOrder() {
    $("body").toggleClass("loading");
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1);

    await axios({
        url: `http://localhost:8000/api/orders/${id}`,
        method: "put",
        data: JSON.stringify({
            is_confirmed: true,
        }),

        headers: {
            "Content-Type": "application/json",
            "Authorization ": `Bearer` + localStorage.getItem("access_token"),
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    })
        .then(function (response) {
            $("body").toggleClass("loading");
            // redirect to order page
            console.log(response);
            // window.location.href = "/users-admin";
        })
        .catch(function (error) {
            console.log(error);

            $("body").toggleClass("loading");
        });
}

// function renderOrder(orders) {
//     var listOrderBlock = document.querySelector("#tables-order");

//     var htmls = orders.map(function (order) {
//         return ` <tr>
//                   <td style="width: auto">${order.id}</td>
//                   <td>${order.address}</td>
//                   <td>${order.total}</td>
//                   <td>${order.status}</td>
//                 </tr>`;
//     });
//     listProductBlock.innerHTML = htmls.join("");
// }
