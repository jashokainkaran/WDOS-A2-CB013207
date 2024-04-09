document.addEventListener("DOMContentLoaded", function() {
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        // Check if email is valid
        if (validateEmail(email)) {
            // Save email to localStorage
            saveSubscription(email);
            alert('Thank you for subscribing to our newsletter!');
            // Clear the email textbox
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Function to validate email
    function validateEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    // Function to save subscription to localStorage
    function saveSubscription(email) {
        // Get existing subscriptions from localStorage or create a new array
        let subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

        subscriptions.push(email);

        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
});
