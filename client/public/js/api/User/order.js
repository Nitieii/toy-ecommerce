const token = localStorage.getItem("access_token");

getAllOrder();

var listOrderBlock = document.querySelector("#tables-order");

async function getAllOrder() {
    await axios({
        url: `http://localhost:8000/api/getUserOrders`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            var orders = response.data;

            for (let i = 0; i < orders.length; i++) {
                const date = new Date(orders[i].created_at);

                const orderDate = date.toLocaleString();

                var htmls = `<tr>
                   <td style="width: auto">${orders[i].id}</td>
                   <td>${(orders[i].total / 1000).toFixed(3)}</td>
                   <td>${
                       orders[i].is_confirmed == 1 ? "Confirmed" : "Pending"
                   }</td>
                   <td>${orderDate}</td>
               </tr>`;

                listOrderBlock.innerHTML += htmls;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
