var listProduct = document.querySelector("#single-product-area");

function start() {
    getProduct();
}

window.onload = start();

async function getProduct() {
    try {
        const result = await axios.get(
            "http://localhost:8000/api/products?page=1"
        );
        const products = result.data.data;

        //
        var listProductBlock = document.querySelector(".amado-catagory");

        for (var i = 0; i < products.length; i++) {
            var product = products[i];

            var html = `
            <div class="single-products-catagory clearfix" >
                <a href="/product-detail/${product.id}">
                    <img src=${
                        product?.images.length > 0
                            ? product?.images[0].image_url
                            : "../../../assets/img/product-img/product1.jpg"
                    } alt="">

                    <div class="hover-content">
                        <div class="line"></div>
                        <p>From $ ${product?.price}</p>
                        <h4>${product?.name}</h4>
                    </div>
                </a>
           </div>
            `;
            listProductBlock.innerHTML += html;
        }
    } catch (error) {
        console.log("error", error);
    }
}
