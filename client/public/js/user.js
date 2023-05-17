// const token = localStorage.getItem("access_token");

let users = [];

window.onload = function start() {
    getAllUsers(function (users) {
        renderUsers();
    });
};

async function getAllUsers(callback) {
    await axios({
        url: "http://localhost:8000/api/users",
        method: "GET",
        headers: {
            "Authorization ": `Bearer ${token}`,
        },
    })
        .then(function (response) {
            users = response.data;
            // console.log(users.data);F
        })
        .then(callback)
        .catch(function (error) {
            console.log(error);
        });
}

async function renderUsers() {
    var listUserBlock = document.querySelector("#tables-user");

    if (!listUserBlock) return;

    var htmls = users.data.map(function (user) {
        return `<tr>
                  <td>${user.id}</td>
                  <td>${user.full_name}</td>
                  <td>${user.email}</td>
                  <td>${user.is_admin}</td>
                </tr>`;
    });

    listUserBlock.innerHTML = htmls.join("");
}
