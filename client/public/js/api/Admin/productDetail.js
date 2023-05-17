if (!localStorage.getItem("access_token")) {
    // Show logout button
    alert("You are not logged in. Please login to continue.");
    window.location.href = "http://localhost:8000/login";
}

var files = [];
var imagesInput = document.getElementById("images-input");
var imagesContainer = document.getElementById("images-container");

const token = localStorage.getItem("access_token");
const is_admin = localStorage.getItem("is_admin");

const url = window.location.href;
const id = url.substring(url.lastIndexOf("/") + 1);

// Check if the user is logged in
if (!token || !is_admin) {
    alert("You are not logged in as admin. Please login as admin to continue");
    window.location.href = "/login";
}

if (window.File && window.FileList && window.FileReader) {
    imagesInput.addEventListener("change", () => {
        // If the images container is empty, add the images to the container
        if (!imagesContainer.innerHTML) {
            let imageFiles = imagesInput.files;

            if (imageFiles.length == 0) return;

            for (let i = 0; i < imageFiles.length; i++) {
                files.push(imageFiles[i]);
            }

            showImages();
        } else {
            // If the images container is not empty, add the new images to the container
            let imageFiles = imagesInput.files;

            if (imageFiles.length == 0) return;

            for (let i = 0; i < imageFiles.length; i++) {
                files.push(imageFiles[i]);
            }

            appendImages();
        }
    });
} else {
    console.log("Your browser does not support File API");
}

$(document).ready(function () {
    // Get the id of the product from the url
    // If the id exists, get the product from the api
    if (id && id !== "product-detail-admin") {
        $("body").toggleClass("loading");
        try {
            axios
                .get(`http://localhost:8000/api/products/${id}`)
                .then((response) => {
                    const product = response.data;

                    // Set the values of the input fields
                    $("#product_id").val(product.id);
                    $("#product_name").val(product.name);
                    $("#description").val(product.description);
                    $("#price").val(product.price);
                    $("#quantity").val(product.quantity);
                    $("#description").val(product.description);

                    document.querySelector(".nice-select span").innerHTML =
                        product.category;

                    // Display the images of the product
                    const images = product.images;

                    // Loop through the images and display them
                    const imagesContainer =
                        document.querySelector("#images-container");

                    images.forEach((image, index) => {
                        const imageDiv = `
                        <div class="image">
                        <img
                            src="${image.image_url}"
                            alt="image-product"
                        /><span onclick="delImage(${index})"
                            >&times;</span
                        >
                    </div>`;
                        imagesContainer.innerHTML += imageDiv;
                    });

                    $("body").toggleClass("loading");
                })
                .catch((error) => {
                    $("body").toggleClass("loading");

                    if (error.response?.status === 404) {
                        alert("Product not found");
                        window.location.href = "/product-admin";
                    } else {
                        console.log(error);
                    }
                });
        } catch (error) {
            // if error code is 404, alert the user
            $("body").toggleClass("loading");
            if (error.response.status === 404) {
                alert("Product not found");
            }
        }
    } else {
        // Display none the delete button
        $("#delete-btn").css("display", "none");

        // Display none the input and label
        $("#product_id").css("display", "none");
        $("#product_id_label").css("display", "none");

        // Change the text of the submit button to Create product
        $("#create-product").text("Create product");
    }
});

function showImages() {
    let images = files.reduce(function (prev, file, index) {
        return (prev += `<div class="image">
  <img src="${URL.createObjectURL(file)}" alt="image">
  <span onclick="delImage(${index})">&times;</span>
 </div>`);
    }, "");

    imagesContainer.innerHTML = images;
}

function appendImages() {
    let images = files.reduce(function (prev, file, index) {
        return (prev += `<div class="image">
  <img src="${URL.createObjectURL(file)}" alt="image">
  <span onclick="delImage(${
      imagesContainer.innerHTML.length + index - 1
  })">&times;</span>
 </div>`);
    }, "");

    imagesContainer.innerHTML += images;
}

function delImage(index) {
    files.splice(index, 1);
    showImages();
}

$("#productform").on("submit", async function (e) {
    e.preventDefault();
    $("body").toggleClass("loading");

    const validation = validateForm();

    if (validation) {
        // Get form inputs
        let name = $("#product_name").val();
        let description = $("#description").val();
        let price = $("#price").val();
        let quantity = $("#quantity").val();
        let category = $("#product_category").val();

        // Check if the form is for updating or creating a new product
        if (!id || id == "product-detail-admin") {
            let images = document.getElementById("images-input").files;

            var form_data = new FormData();
            form_data.append("name", name);
            form_data.append("description", description);
            form_data.append("price", price);
            form_data.append("quantity", quantity);
            form_data.append("category", category);

            for (let i = 0; i < images.length; i++) {
                form_data.append("images[]", images[i]);
            }

            await axios({
                url: `http://localhost:8000/api/products`,
                method: "POST",
                data: form_data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization ": `Bearer ${token}`,
                },
            })
                .then(function (response) {
                    $("body").toggleClass("loading");

                    alert("Product created successfully");
                    // redirect to products page
                    window.location.href = "product-admin";
                })
                .catch(function (error) {
                    console.log(error.response.data);

                    $("body").toggleClass("loading");
                });
        } else {
            updateProduct();
        }
    }
});

function validateForm() {
    // Get the values of the input fields
    const name = $("#product_name").val();
    const description = $("#description").val();
    const price = $("#price").val();
    const quantity = $("#quantity").val();
    const category = $("#product_category").val();

    const imagesContainer = document.querySelector("#images-container");

    // If any of the input fields is empty, alert the user
    if (
        !name ||
        !description ||
        !price ||
        !quantity ||
        !category ||
        (imagesContainer.childNodes.length === 0 && files.length === 0)
    ) {
        alert("Please fill in all the fields");
        $("body").toggleClass("loading");
        return false;
    }

    return true;
}

function deleteProduct() {
    let confirmDelete = confirm("Are you sure you want to delete the product?");

    $("body").toggleClass("loading");

    if (confirmDelete) {
        axios({
            url: `http://localhost:8000/api/products/${id}`,
            method: "delete",
            headers: {
                "Authorization ": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                $("body").toggleClass("loading");

                alert("Product deleted successfully");
                window.location.href = "/product-admin";
            })
            .catch(function (error) {
                $("body").toggleClass("loading");

                console.log(error.response.data);
            });
    }
}

function updateProduct() {
    // Get updated informatin
    let name = $("#product_name").val();
    let description = $("#description").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let category = $("#product_category").val();

    var form_data = new FormData();
    form_data.append("name", name);
    form_data.append("description", description);
    form_data.append("price", price);
    form_data.append("quantity", quantity);
    form_data.append("category", category);

    //
    form_data.append("_method", "PUT");
    form_data.append("_token", $('meta[name="csrf-token"]').attr("content"));

    for (let i = 0; i < files.length; i++) {
        form_data.append("images[]", files[i]);
    }

    try {
        axios({
            url: `http://localhost:8000/api/products/${id}`,
            method: "POST",
            data: form_data,
            headers: {
                "Authorization ": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                console.log("response", response);
                alert("Product updated successfully");
                $("body").toggleClass("loading");
            })
            .catch(function (error) {
                $("body").toggleClass("loading");
                console.log(error);
            });
    } catch (error) {
        $("body").toggleClass("loading");
        console.log(error);
    }
}
