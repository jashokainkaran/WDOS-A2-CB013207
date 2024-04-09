document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('./script/users.json')
            .then(response => response.json())
            .then(data => {
                const users = data.users;

                const user = users.find(user => user.username === username && user.password === password);

                if (user) {
                    window.location.href = './home.html';
                } else {
                    message.textContent = 'Invalid username or password.';
                }
            })
            .catch(error => console.error('Error loading users:', error));
    });
});
