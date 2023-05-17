const url = window.location.href;
const id = url.substring(url.lastIndexOf("/") + 1);

getProductById(id);

var productPrice = document.querySelector("#product-price");
var productImg = document.querySelector("#product-img");
var productDescription = document.querySelector("#product-description");
var productName = document.querySelector("#product-name");
var productTitle = document.querySelector("#product-title");
var productStatus = document.querySelector("#product-status");
var ratingStar = document.querySelector("#rating-star");
var quantitySelection = document.querySelector("#quantity-selection");
var productImage = document.querySelector("#product-image");
var productImageSlide = document.querySelector("#product-image-slide");
var btnAdd = document.querySelector("#btn-add");
var btnOutOfOrder = document.querySelector("#btn-out-of-order");
var productCategory = document.querySelector("#product-category");
var quantity = document.querySelector("#qty");
// const parentElement = quantitySelection.parentNode;

var product;

function getProductById(id) {
    try {
        axios
            .get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
                //   $("body").toggleClass("loading");
                product = response.data;
                // console.log(product);
                quantity.setAttribute("max", product.quantity);

                for (let i = 0; i < product.images.length; i++) {
                    productImageSlide.innerHTML += `<li class="${
                        i === 0 ? "active" : ""
                    }" data-target="#product_details_slider" data-slide-to="${i}"
                                    style="
                  background-image: url(${product.images[i].image_url});
                ">
                                </li>`;
                }

                for (let i = 0; i < product.images.length; i++) {
                    productImage.innerHTML += `  <div class="carousel-item ${
                        i === 0 ? "active" : ""
                    } >
                                    <a class="gallery_img" href="">
                                        <img class="d-block w-100" src="${
                                            product.images[i].image_url
                                        }"
                                            alt="Product slide" />
                                    </a>
                                </div>`;
                }

                productDescription.innerHTML = product.description;
                for (let i = 0; i < product.rating; i++) {
                    ratingStar.innerHTML += `<i class="fa fa-star" aria-hidden="true"></i>`;
                }
                for (let i = 0; i < 5 - product.rating; i++) {
                    ratingStar.innerHTML += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
                }
                // console.log(product)
                if (product.status === "in_stock") {
                    productStatus.classList.toggle("avaibility");
                    productStatus.innerHTML = ` <i class="fa fa-circle"></i> In stock - ${product.quantity} products available`;
                    btnOutOfOrder.style.display = "none";
                } else if (product.status === "out_of_stock") {
                    productStatus.classList.toggle("outstock");
                    productStatus.innerHTML = ` <i class="fa fa-circle"></i> Out of Stock`;
                    btnAdd.style.display = "none";

                    // $("#quantity-selection").disabled = true;
                } else {
                    productStatus.classList.toggle("runninglow");
                    productStatus.innerHTML = ` <i class="fa fa-circle"></i> Running Low - ${product.quantity} products available`;
                    btnOutOfOrder.style.display = "none";
                }

                productCategory.innerHTML = product.category;
                productTitle.innerHTML = product.name;
                productName.innerHTML = product.name;
                productPrice.innerHTML = product.price;
            });
    } catch (error) {
        console.log(error);
    }
}

document
    .querySelector("#add-cart-form")
    .addEventListener("submit", function (e) {
        try {
            e.preventDefault();

            if (!localStorage.getItem("access_token")) {
                // Show logout button
                alert(
                    "You are not logged in. Please login to add product to cart"
                );
                window.location.href = "http://localhost:8000/login";
            }

            $("body").toggleClass("loading");

            // Check if the quantity input exceeds the quantity of the product
            if (quantity.value > product.quantity) {
                alert(
                    "The quantity of the product has exceeded the quantity of the product"
                );
            }

            axios
                .post(
                    "http://localhost:8000/api/cartItem",
                    {
                        cart_id: localStorage.getItem("cart_id"),
                        product_id: id,
                        quantity: quantity.value,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("access_token"),
                        },
                    }
                )
                .then((response) => {
                    $("body").toggleClass("loading");

                    // Alert the message
                    alert("Add to cart successfully");

                    // Update the cart count
                    const currentQuantity = parseInt(
                        document.getElementById("cart-count").innerHTML
                    );

                    if (!currentQuantity) {
                        document.getElementById("cart-count").innerHTML = 1;
                        return;
                    }

                    document.getElementById("cart-count").innerHTML =
                        currentQuantity + 1;
                })
                .catch((error) => {
                    $("body").toggleClass("loading");
                    console.log(error.response);
                });
        } catch (error) {
            console.log(error);
            $("body").toggleClass("loading");
        }
    });
