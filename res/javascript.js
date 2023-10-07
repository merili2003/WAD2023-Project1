document.addEventListener("DOMContentLoaded", function () {
    // Attach an event listener to the form
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        // Prevent the form from submitting (and page from refreshing)
        event.preventDefault();

        // Call your validation function
        if (validateLoginForm()) {
            // Redirect to index.html if the login is valid
            window.location.href = "index.html";
        }
    });
});

function validateLoginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessageElement = document.getElementById("error-message");

    // Example validation: Check if the fields are not empty (more robust checks can be added as per requirements)
    if (email.trim() === "" || password.trim() === "") {
        errorMessageElement.textContent = "Please fill out all the fields.";
        return false;
    }

    // Example validation: Check if the email format is correct (the 'required' attribute on the email input already does a basic check, but this is an additional measure)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errorMessageElement.textContent = "Invalid email format.";
        return false;
    }

    // If all checks pass, return true.
    errorMessageElement.textContent = "";  // Clear any previous error messages
    return true;
}
