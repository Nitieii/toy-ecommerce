if (!localStorage.getItem("access_token")) {
    // Show logout button
    alert("You are not logged in. Please login to continue.");
    window.location.href = "http://localhost:8000/login";
}

const token = localStorage.getItem("access_token");

// Get the id of the product from the url
const url = window.location.href;
const id = url.substring(url.lastIndexOf("/") + 1);

// If the id exists, get the product from the api
if (id && id !== "user-detail-admin") {
    $("body").toggleClass("loading");
    try {
        axios
            .get(`http://localhost:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const user = response.data;
                if (user.is_admin) {
                    // Set attribute selected for the admin option using child nodes
                    document.querySelector(".nice-select span").innerHTML =
                        "Admin";
                } else {
                    // Set attribute selected for the user option using child nodes
                    document.querySelector(".nice-select span").innerHTML =
                        "User";
                }
                // Set the values of the input fields
                $("#user_name").val(user.full_name);
                $("#email").val(user.email);

                // window.location.href = "users-admin";
                $("body").toggleClass("loading");
            })
            .catch((error) => {
                $("body").toggleClass("loading");

                if (error.response?.status === 404) {
                    alert("user not found");
                    window.location.href = "/users-admin";
                } else {
                    console.log("error", error);
                }
            });
    } catch (error) {
        // if error code is 404, alert the user
        $("body").toggleClass("loading");

        console.log("error", error);
    }
}

$(document).ready(function (e) {
    $("#userform").on("submit", async function (e) {
        e.preventDefault();
        $("body").toggleClass("loading");
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf("/") + 1);

        // Get form inputs
        let name = $("#user_name").val();
        let email = $("#email").val();
        let role = $("#admin").val();

        // Call api using x-www-form-urlencoded
        await axios({
            url: `http://localhost:8000/api/users/${id}`,
            method: "POST",
            data: JSON.stringify({
                full_name: name,
                email: email,
                is_admin: role,
                _method: "PUT",
            }),

            headers: {
                "Content-Type": "application/json",
                "Authorization ": `Bearer ${token}`,
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        })
            .then(function (response) {
                $("body").toggleClass("loading");
                // redirect to products page
                console.log(response);
                alert("User updated successfully");
            })
            .catch(function (error) {
                $("body").toggleClass("loading");

                console.log(error);
            });
    });
});

async function deleteUser() {
    let confirmDelete = confirm(
        "Are you sure you want to delete the user from the database? This will delete all the user's data."
    );

    if (confirmDelete) {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf("/") + 1);
        await axios({
            url: `http://localhost:8000/api/users/${id}`,
            method: "DELETE",
            headers: {
                "Authorization ": `Bearer ${token}`,
            },
        })
            .then(function (response) {
                console.log(response);
                window.location.href = "/users-admin";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
