function validateForm(event) {
    event.preventDefault();

    let messageElement = document.getElementById('message');
    messageElement.innerHTML = ''; 

   
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email && !password) {
        showMessage('Please enter both email and password.', 'error');
        return;
    }

    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    if (!emailRegex.test(email)) {
        showMessage('Invalid email address. Please enter a valid email.', 'error');
        return;
    }

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        showMessage('Invalid password. It must contain at least 8 characters includes numbers, small and capital letters.', 'error');
        return;
    }

    document.getElementById('loginForm').submit();
}

function showMessage(message, type) {
    let messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type;
}