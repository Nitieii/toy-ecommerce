if (!localStorage.getItem("access_token")) {
    // Show logout button
    alert("You are not logged in. Please login to continue.");
    window.location.href = "http://localhost:8000/login";
}

function start() {
    getProduct(function (products) {
        renderProduct(products);
    });
}

start();

function getProduct(callback) {
    fetch("http://localhost:8000/api/getAllProducts")
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderProduct(products) {
    var listProductBlock = document.querySelector("#tables-product");

    if (listProductBlock) {
        var htmls = products.map(function (product) {
            return ` <tr>
                      <td style="width: auto">${product.id}</td>
                      <td>${product.name}</td>
                      <td>${product.category}</td>
                      <td>${product.price}</td>
                      <td>${product.quantity}</td>
                    </tr>`;
        });

        listProductBlock.innerHTML = htmls.join("");
    }
}
