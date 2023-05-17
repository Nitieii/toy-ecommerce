window.onload = function () {
    if (localStorage.getItem("access_token")) {
        if (localStorage.getItem("is_admin") == 1) {
            window.location.href = "http://localhost:8000/admin";
        } else {
            window.location.href = "http://localhost:8000";
        }
    }
};

document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
        e.preventDefault();
        const checked = validateForm();

        if (checked) {
            // Get the value of name, email and password from the input
            var data = {
                full_name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("pass").value,
            };

            // Calling axios to send a POST request to register api
            axios
                .post("http://localhost:8000/api/register", data)
                .then(function (response) {
                    // If the request is successful, save the access token to local storage
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );

                    localStorage.setItem("username", response.data.full_name);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("user_id", response.data.user_id);
                    localStorage.setItem("is_admin", response.data.is_admin);
                    localStorage.setItem("cart_id", response.data.cart_id);
                    localStorage.setItem(
                        "expires_at",
                        Date.now() + response.data.expires_in * 1000
                    );

                    setTimeout(function () {
                        alert("Your session has expired! Please login again!");
                        localStorage.clear();
                    }, response.data.expires_in * 1000);

                    alert("Register successfully");

                    window.location.href = "http://localhost:8000";
                })
                .catch(function (error) {
                    // If the request is failed, show the error message
                    if (error.response.data.errors) {
                        if (error.response.data.errors.email) {
                            alert(error.response.data.errors.email[0]);
                        }
                    }
                });
        }
    });

//validate form for signing up
function validateForm() {
    let form = document.getElementById("register-form");
    const checked = document.getElementById("agree-term").checked;

    var passwordPattern = /^(?=.*[a-z])(?=.*[0-9]).{8,}$/;

    // Check if the password and re-password are the same
    if (form.pass.value !== form.re_pass.value) {
        alert("Passwords do not match!");
        form.pass.focus();
        return false;
    }
    // Check if the password is valid
    else if (!passwordPattern.test(form.pass.value)) {
        alert(
            "Passwords must have at least 8 characters, at least one letter and one number!"
        );
        return false;
    }

    return true;
}
