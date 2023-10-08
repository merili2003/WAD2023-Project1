// Wait for the DOM to be fully loaded before attaching the event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Attach an event listener to the login form on its submission
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        // Prevent the default form submission behavior which could lead to a page reload
        event.preventDefault();

        // Validate the login form; if valid, redirect to the main page
        if (validateLoginForm()) {
            window.location.href = "index.html";
        }
    });
});

/**
 * Validate the login form's email and password fields
 * @returns {boolean} Returns true if the form is valid, false otherwise
 */
function validateLoginForm() {
    // Fetch the values of the email and password fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Get a reference to the element displaying error messages
    const errorMessageElement = document.getElementById("error-message");

    // Check if either the email or password fields are empty
    if (email.trim() === "" || password.trim() === "") {
        errorMessageElement.textContent = "Please fill out all the fields.";
        return false;
    }

    // Validate the email format using a regular expression pattern
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errorMessageElement.textContent = "Invalid email format.";
        return false;
    }

    // If all validations pass, clear any error messages and return true to indicate successful validation
    errorMessageElement.textContent = "";  
    return true;
}