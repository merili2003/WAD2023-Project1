// Wait for the DOM to be fully loaded before attaching the event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Validate login form and attach event listener for dropdown menu
    initializePage();

    // Fetch posts from a local file (posts.js)
    displayPosts();

    // Placeholder for fetching posts from an online source
    // fetchPostsFromGist();
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

//Reads the posts from data.Posts (assuming data is the object from posts.js) and creates HTML elements for each post.
function displayPosts() {
    // Assuming 'data' is the global object from posts.js
    if (data && data.Posts) {
        data.Posts.forEach(post => {
            createPostElement(post);
        });
    }
}

//Generates the HTML structure for each post.
function createPostElement(post) {
    const postContainer = document.createElement('div');
    postContainer.className = 'Post';
    postContainer.innerHTML = `
        <header class="post-header">
            <img src="${post.pfp}" alt="Profile picture">
            <p>${post.date}</p>
        </header>
        <div class="Post-content">
            ${post.image ? `<img src="${post.image}" alt="${post['alt-image']}">` : ''}
            <p>${post.body}</p>
        </div>
    `;
    document.querySelector('.Posts-container').appendChild(postContainer);
}



// Placeholder function for fetching posts from an online source
// Fetch posts from the GitHub Gist
function fetchPostsFromGist() {
    const gistUrl = 'https://gist.githubusercontent.com/koodikirjutaja/eb5d36442a1ff84bde1f4aec5b41ad21/raw/YOUR_RAW_GIST_URL_HERE';

    fetch(gistUrl)
        .then(response => response.json())
        .then(data => {
            // Assuming data structure matches what your application expects
            data.Posts.forEach(post => {
                createPostElement(post);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
