/**
 * Handles comment submission for a specific post.
 * @param {Event} event - The form submission event.
 * @param {string} postId - The ID of the post (e.g., 'post1').
 */
function handleCommentSubmit(event, postId) {
    event.preventDefault(); // Prevent default form submission

    // Get user input
    const nameInput = document.getElementById(`name-${postId}`);
    const messageInput = document.getElementById(`message-${postId}`);
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    // Basic validation
    if (!name || !message) {
        alert('Please enter both name and message.');
        return;
    }

    // Get the comments list container
    const commentsList = document.getElementById(`comments-list-${postId}`);

    // Create new comment element
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `
        <p><strong>${escapeHTML(name)}:</strong></p>
        <p>${escapeHTML(message)}</p>
    `;

    // Append the new comment
    commentsList.appendChild(commentDiv);

    // Clear the form fields
    nameInput.value = '';
    messageInput.value = '';
}

/**
 * Escapes HTML characters to prevent XSS.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escape[match];
    });
}

// === Hamburger Menu Toggle ===
const hamburgerButton = document.getElementById('hamburger-button');
const mainNav = document.getElementById('main-nav');

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// === NEW: Search/Filter Functionality ===
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const blogPosts = document.querySelectorAll('.blog-post'); // Get all post articles

function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase(); // Get search term, ignore case

    blogPosts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('.post-content').textContent.toLowerCase();
        const isMatch = title.includes(searchTerm) || content.includes(searchTerm);

        // Show or hide the post based on match
        post.style.display = isMatch ? 'block' : 'none';
    });
}

// Trigger search on button click
searchButton.addEventListener('click', filterPosts);

// Optional: Trigger search as user types (live search)
searchInput.addEventListener('keyup', filterPosts);

// === NEW: Setup Social Sharing Links ===
function setupShareLinks() {
    const shareLinks = document.querySelectorAll('.social-share a');
    const pageUrl = window.location.href; // Get current page URL
    const pageTitle = document.title; // Get page title

    shareLinks.forEach(link => {
        const postArticle = link.closest('.blog-post'); // Find parent post
        let postTitle = pageTitle; // Default to page title
        let postUrl = pageUrl; // Default to page url

        if(postArticle) {
             // Try to get specific post title and URL (more accurate if posts have unique IDs/anchors)
             const titleElement = postArticle.querySelector('h2');
             if(titleElement) postTitle = titleElement.textContent;
             postUrl = `${pageUrl}#${postArticle.id}`; // Link to the post's anchor
        }

        const encodedUrl = encodeURIComponent(postUrl);
        const encodedTitle = encodeURIComponent(postTitle);

        if (link.classList.contains('twitter')) {
            link.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
            link.target = '_blank'; // Open in new tab
        } else if (link.classList.contains('facebook')) {
            link.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            link.target = '_blank';
        } else if (link.classList.contains('email')) {
            link.href = `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20post:%20${encodedUrl}`;
            // No target needed for mailto
        }
    });
}

// Call setup function when the page loads
document.addEventListener('DOMContentLoaded', setupShareLinks);
// === END NEW ===

// Add event listeners for each comment form
document.getElementById('comment-form-post1').addEventListener('submit', (event) => handleCommentSubmit(event, 'post1'));
document.getElementById('comment-form-post2').addEventListener('submit', (event) => handleCommentSubmit(event, 'post2'));
document.getElementById('comment-form-post3').addEventListener('submit', (event) => handleCommentSubmit(event, 'post3'));