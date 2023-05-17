const token = localStorage.getItem("access_token");
console.log("ttt");
// function start() {
//     getAllOrder(function (orders) {
//         renderOrders(orders);
//     });
// };

getAllOrder();

var listOrderBlock = document.querySelector("#tables-order");

async function getAllOrder() {
    await axios({
        url: `http://localhost:8000/api/orders`,
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

// async function renderOrders() {
//

//     if (!listOrderBlock) return;

//     var htmls = orders.map(function (order) {
//         return ` <tr>
//                   <td style="width: auto">${order.id}</td>
//                   <td>${order.total}</td>
//                   <td>${order.status}</td>
//                   <td>${order.is_admin}</td>
//                 </tr>`;
//     });
//     listOrderBlock.innerHTML = htmls.join("");
// }
