document.addEventListener("DOMContentLoaded", function() {
    // Fade in the current page
    document.body.classList.add('fade-in');

    // Attach fade-out transition to all links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Fade out the current page
            document.body.classList.remove('fade-in');

            // Wait for the fade-out animation to complete
            setTimeout(() => {
                window.location.href = link.href;
            }, 500); // same duration as the CSS transition
        });
    });
});
