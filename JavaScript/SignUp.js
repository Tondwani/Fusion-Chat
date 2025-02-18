let users = JSON.parse(localStorage.getItem("users")) || []; //if users key and array already exist else create new one
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

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

function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // if (!validateForm(username, email, password)) return;
  if (username && email && password) {
    let user = { username: username, email: email, password: password };
    // }
    //   try {
    //

    // if (users.some(u => u.username === username)) {
    //     alert("Username already exists!");
    //     return;
    // }
    // if (users.some(u => u.email === email)) {
    //     alert("Email already registered!");
    //     return;
    // }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
    
  }
  // catch (error) {
  //     console.error("Error during signup:", error);
  //     alert("An error occurred during signup. Please try again.");
  // }
  // }

  // localStorage.setItem('username', JSON.stringify(users));
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-form")
    .addEventListener("submit", handleSignup);
});
