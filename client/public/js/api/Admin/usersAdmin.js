const token = localStorage.getItem("access_token");

function start() {
    getAllUsers(function (users) {
        renderUsers(users);
    });
}

start();

async function getAllUsers(callback) {
    fetch("http://localhost:8000/api/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (error) {
            console.log(error);
        });
}

async function renderUsers(users) {
    var listUserBlock = document.querySelector("#tables-user");

    if (!listUserBlock) return;

    var htmls = users.data.map(function (user) {
        return `<tr>
                  <td style="width: auto">${user.id}</td>
                  <td>${user.full_name}</td>
                  <td>${user.email}</td>
                  <td>${user.is_admin ? "Admin" : "User"}</td>
                </tr>`;
    });

    listUserBlock.innerHTML = htmls.join("");
}
