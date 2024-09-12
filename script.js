document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const apiMessage = document.getElementById('apiMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');


    usernameError.textContent = '';
    passwordError.textContent = '';
    apiMessage.textContent = '';


    let isValid = true;

    if (!validateEmail(username)) {
        usernameError.textContent = 'Please enter a valid email.';
        isValid = false;
    }

    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (!isValid) return;


    loadingSpinner.style.display = 'block';
    apiMessage.textContent = '';


    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(data => {

            loadingSpinner.style.display = 'none';

            apiMessage.textContent = 'Login successful!';
            apiMessage.style.color = 'green';
        })
        .catch(error => {

            loadingSpinner.style.display = 'none';

            apiMessage.textContent = 'Login failed. Please try again.';
            apiMessage.style.color = 'red';
        });
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


document.getElementById('showPassword').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});
