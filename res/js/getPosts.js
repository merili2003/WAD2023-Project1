//import {data} from './res/data/posts.js';

function loadPostsFromWeb(website) {
    fetch(website)
        .then((response) => response.json())
        .then(json => {
            //console.log(json);
            let postsContainers = document.getElementsByClassName("Posts-container");
            let postsContainer = postsContainers[0];
            let posts = json.Posts;
            //console.log(posts);
            for (let i = 0; i < posts.length; i++) {
                //console.log(posts[i]);
                newPost(postsContainer, posts[i]);
            }
        });
}
// See veebilehe oma töötab hetkel
loadPostsFromWeb('https://api.npoint.io/4ca83af1ddd69411c78d');

function loadPostsFromData(data) {
    //console.log(json);
    let postsContainers = document.getElementsByClassName("Posts-container");
    let postsContainer = postsContainers[0];
    let posts = data.Posts;
    //console.log(posts);
    for (let i = 0; i < posts.length; i++) {
        //console.log(posts[i]);
        newPost(postsContainer, posts[i]);
    }
}
// import ei tööta, kuna type pole "module"
// kui oleks "module", siis viskab CORS errori
// ei saa võtta andmeid json ega js failist
//loadPostsFromData(data);


function newPost(postsContainer, post) {
    let new_post = document.createElement("div");
    new_post.className = "Post";

    let header = createHeader(post);
    new_post.appendChild(header);

    let post_content = createPostContent(post);
    new_post.appendChild(post_content);

    let footer = createFooter(post);
    new_post.appendChild(footer);

    postsContainer.appendChild(new_post);
};

function createHeader(post) {
    let header = document.createElement("header");
    header.className = "post-header";

    let pfp = document.createElement("img");
    pfp.src = "res/images/pfp.png";
    pfp.alt = "Profile picture";

    let date = document.createElement("p");
    date.textContent = post.date;

    header.appendChild(pfp);
    header.appendChild(date);
    return header;
}

function createPostContent(post) {
    let post_content = document.createElement("div");
    post_content.className = "Post-content";

    if (post.image != "") {
        let post_image = document.createElement("img");
        post_image.src = post.image;
        post_image.alt = post["alt-image"];
        post_content.appendChild(post_image);
    }
    let post_text = document.createElement("p");
    post_text.textContent = post.body;
    post_content.appendChild(post_text);
    return post_content;
}

function createFooter(post) {
    let footer = document.createElement("footer");
    
    let like_button = document.createElement("button");
    like_button.className = "indexlike";

    let like_image = document.createElement("img");
    like_image.src = "res/images/like.png";
    like_image.alt = "Like";

    like_button.appendChild(like_image);
    footer.appendChild(like_button);
    return footer;
}
       