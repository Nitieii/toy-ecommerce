// Redirect to home page if the user is not admin, otherwise redirect to admin page if the access token already exists
window.onload = function () {
    if (localStorage.getItem("access_token")) {
        if (localStorage.getItem("is_admin") == 1) {
            window.location.href = "http://localhost:8000/admin";
        } else {
            window.location.href = "http://localhost:8000";
        }
    }
};

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the value of email and password from the input
    var email = document.getElementById("your_email").value;
    var password = document.getElementById("your_pass").value;

    // Create json object
    var data = {
        email: email,
        password: password,
    };

    // Using axios to send a POST request to login api
    axios
        .post("http://localhost:8000/api/login", data)
        .then(function (response) {
            // If the request is successful, save the access token to local storage
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("username", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("is_admin", response.data.is_admin);
            localStorage.setItem("cart_id",response.data.cart_id);
            localStorage.setItem(
                "expires_at",
                Date.now() + response.data.expires_in * 1000
            );

            setTimeout(function () {
                alert("Your session has expired! Please login again!");
                localStorage.clear();
            }, response.data.expires_in * 1000);

            alert("Login successfully");

            // Redirect to home page if the user is not admin, otherwise redirect to admin page
            if (response.data.is_admin) {
                window.location.href = "http://localhost:8000/product-admin";
            } else {
                window.location.href = "http://localhost:8000";
            }
        })
        .catch(function (error) {
            // If the request is failed, show the error message
            alert("Email or password is incorrect! Please try again!");
        });
});
