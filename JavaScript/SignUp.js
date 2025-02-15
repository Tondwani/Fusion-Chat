// Function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Enhanced validation function
function validateForm(username, email, password) {
    if (username.length < 3) {
        alert("Username must be at least 3 characters long");
        return false;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    }
    return true;
}

// Updated signup handler
function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateForm(username, email, password)) {
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password,
    };

    try {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check for existing username or email
        if (users.some(u => u.username === username)) {
            alert("Username already exists!");
            return;
        }
        if (users.some(u => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Signup successful! Please login.");
        window.location.href = "login.html"; // Redirect to login page 

    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred during signup. Please try again.");
    }
}

// Add event listener to form
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});