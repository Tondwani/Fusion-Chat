const userslst = JSON.parse(localStorage.getItem('users')) || [];
console.log(userslst);
 document.addEventListener("DOMContentLoaded", () => {

//         const currentUser = JSON.parse(localStorage.getItem('users'));
//         const userElement = document.getElementById("current-user");
//         console.log(userElement);
//         if (currentUser && userElement) {
//             userElement.textContent = currentUser.username;
//         }

//         displayRegisteredUsers();

// });

// let activeUser = null;

// function selectUser(username) {
//     activeUser = username;
//     const userElements = document.querySelectorAll('.contact-item');
//     userElements.forEach(userElement => {
//         if (userElement.querySelector('.contact-name').textContent === username) {
//             userElement.classList.add('contact-active');
//         } else {
//             userEleme.classList.remove('contact-active');
//         }
//     });
//     loadMessages();
// }

// function sendMessage() {
//     const input = document.getElementById("messageInput");
//     const message = input.value.trim();

//     if (message === "" || !activeUser) return;

//     const messages = JSON.parse(localStorage.getItem("messages")) || [];
//     const timestamp = new Date().toLocaleTimeString();
//     messages.push({
//         from: JSON.parse(localStorage.getItem('currentUser')).username,
//         to: activeUser,
//         text: message,
//         time: timestamp
//     });
//     localStorage.setItem("messages", JSON.stringify(messages));

//     input.value = "";
//     loadMessages();
// }

// function loadMessages() {
//     const messages = JSON.parse(localStorage.getItem("messages")) || [];
//     const messagesContainer = document.getElementById("messages-container");
//     if (messagesContainer) {
//         messagesContainer.innerHTML = '';
//         messages.forEach(message => {
//             if ((message.from === JSON.parse(localStorage.getItem('currentUser')).username && message.to === activeUser) ||
//                 (message.to === JSON.parse(localStorage.getItem('currentUser')).username && message.from === activeUser)) {
//                 const messageElement = document.createElement('div');
//                 messageElement.className = 'message';
//                 messageElement.textContent = `${message.from}: ${message.text} (${message.time})`;
//                 messagesContainer.appendChild(messageElement);
//             }
//         });
//     }
// }

function displayRegisteredUsers() {
    console.log("Logging");
  const usersContainer = document.getElementById("usersLst");

  if (usersContainer) {
    usersContainer.innerHTML = "";

      userslst.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "contact-item";
      userElement.onclick = () => selectUser(user.username);

      const avatar = document.createElement("div");
      avatar.className = "contact-avatar";
      avatar.textContent = user.username.charAt(0).toUpperCase();

      const username = document.createElement("div");
      username.className = "contact-name";
      username.textContent = user.username;

      userElement.appendChild(avatar);
      userElement.appendChild(username);
      usersContainer.appendChild(userElement);
    });
  } else {
    console.error("Contacts list container not found!");
  }
}

// function logout() {
//     localStorage.removeItem('currentUser');
//     window.location.href = "Login.html";
// }

// */
window.onload=displayRegisteredUsers()
// function loadUsersFromLocalStorage() {
//   const storedUsersString = localStorage.getItem("users"); // Get users from local storage

//   if (storedUsersString) {
//     return JSON.parse(storedUsersString); // Parse string back into an array
//   } else {
//     return []; // Return an empty array if no users were stored
//   }
// }

// const users = loadUsersFromLocalStorage();

// console.log(users); // Will print the array of users from local storage
 } );