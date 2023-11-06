// Wait for the DOM to be fully loaded before attaching the event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Validate login form and attach event listener for dropdown menu
    initializePage();

    // Check if you want to display local posts or Gist posts
    const displayLocalPosts = true; // Set this to true for local posts, false for Gist posts

    if (displayLocalPosts) {
        // Fetch and display local posts from JSON data
        fetchPosts();
    } else {
        // Fetch and display posts from Gists
        fetchPostsGist();
    }
});

//Initializes the login form validation and dropdown menu functionality.
function initializePage(){
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (validateLoginForm()) {
                window.location.href = "index.html";
            }
        });
    }

    const profilePic = document.getElementById("profilePic");
    if (profilePic) {
        profilePic.addEventListener("click", function() {
            const dropdown = document.getElementById("dropdownMenu");
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
    }
}


function validateLoginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessageElement = document.getElementById("error-message");

    if (email.trim() === "" || password.trim() === "") {
        errorMessageElement.textContent = "Please fill out all the fields.";
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errorMessageElement.textContent = "Invalid email format.";
        return false;
    }

    errorMessageElement.textContent = "";
    return true;
}

// Function to display posts from JSON data
function fetchPosts(data) {
    fetch("res/data/posts.json") // Assuming the file is in the "res/data" directory
        .then(response => response.json())
        .then(data => {
            displayPosts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Generates the HTML structure for each post.
function createPostElement(post) {
    // Create a new HTML element to represent a post
    const postContainer = document.createElement('div');
    postContainer.className = 'Post'; // Assign a CSS class to style the post container

    // Set the HTML content for the post container
    postContainer.innerHTML = `
        <header class="post-header">
            <img src="${post.pfp}" alt="Profile picture"> <!-- Display the profile picture -->
            <p>${post.date}</p> <!-- Display the post date -->
        </header>
        <div class="Post-content">
            ${post.image ? `<img src="${post.image}" alt="${post['alt-image']}">` : ''}
            <p>${post.body}</p> <!-- Display the post content -->
        </div>
    `;

    // Append the post container to the 'Posts-container' in the HTML document
    document.querySelector('.Posts-container').appendChild(postContainer);
}

// Function to display posts from JSON data
function displayPosts(data) {
    // Check if 'data' is a valid JSON object and contains a 'Posts' property
    if (data && data.Posts) {
        // Iterate over each post in the 'Posts' array
        data.Posts.forEach(post => {
            createPostElement(post); // Call the 'createPostElement' function to create and display the post
        });
    }
}


// Function to fetch and display posts from the GitHub Gist URL
function fetchPostsGist() {
    // Define the Gist URL
    const gistUrl = 'https://gist.githubusercontent.com/koodikirjutaja/eb5d36442a1ff84bde1f4aec5b41ad21/raw';

    // Send an HTTP GET request to the Gist URL using Axios
    axios.get(gistUrl)
        .then(response => {
            const data = response.data; // Parse JSON data from the response
            displayPosts(data); // Display the parsed data as posts
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors that occur during the request
}

