// Check if the user is logged in
if (!localStorage.getItem("access_token")) {
    // Show logout button
    alert("You are not logged in. Please login to continue.");
    window.location.href = "http://localhost:8000/login";
} else {
    // Get the user information from the local storage and fill in the input fields
    var username = localStorage.getItem("username");
    var email = localStorage.getItem("email");

    document.getElementById("full_name").value = username;
    document.getElementById("email").value = email;
}

// add event listener to the profile form
document
    .getElementById("profile-form")
    .addEventListener("submit", function (e) {
        // prevent the form from loading
        e.preventDefault();

        // Check if the fieds full_name and email are different from the current values
        if (
            document.getElementById("full_name").value ==
                localStorage.getItem("username") &&
            document.getElementById("email").value ==
                localStorage.getItem("email")
        ) {
            alert("You have not changed any of the fields.");
            return;
        }

        // Check if either of the fields are empty
        if (
            !document.getElementById("full_name").value ||
            !document.getElementById("email").value
        ) {
            alert("Please fill in all the fields.");
            return;
        }

        var data = {
            full_name: document.getElementById("full_name").value,
            email: document.getElementById("email").value,
        };

        try {
            axios
                .put(
                    "http://localhost:8000/api/users/" +
                        localStorage.getItem("user_id"),
                    data,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("access_token"),
                        },
                    }
                )
                .then(function (response) {
                    // If the request is successful, update the local storage
                    localStorage.setItem("username", response.data.full_name);
                    localStorage.setItem("email", response.data.email);

                    // Show success message
                    alert("Profile updated successfully.");
                })
                .catch(function (error) {
                    // If the request is failed, show the error message
                    if (error.response.data.errors.email) {
                        alert(error.response.data.errors.email[0]);
                        return;
                    }

                    alert("There is an error. Please try again later.");
                });
        } catch (error) {
            alert("There is an error. Please try again later.");
        }
        // Send put request to the server
    });
