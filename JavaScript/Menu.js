const userslst = JSON.parse(localStorage.getItem("users")) || [];
console.log(userslst);
document.addEventListener("DOMContentLoaded", () => {
 
  let activeUser = null;

  function selectUser(user) {
    activeUser = user;
    const userElements = document.querySelectorAll(".contact-item");
    userElements.forEach((userElement) => {
      if (
        userElement.querySelector(".contact-name").textContent === user.username
      ) {
        userElement.classList.add("contact-active");
      } else {
        userElement.classList.remove("contact-active");
      }
    });
    loadMessages();
  }

  function sendMessage() {
    console.log("sendBtn");
    const input = document.getElementById("messageInput");
    const message = input.value;

    if (message === "" || !activeUser) return;

    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const timestamp = new Date().toLocaleTimeString();
    messages.push({
      from: JSON.parse(localStorage.getItem("currentUser")).username,
      to: activeUser,
      text: message,
      time: timestamp,
    });
    localStorage.setItem("messages", JSON.stringify(messages));

    input.value = "";
    loadMessages();
  }

  function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.innerHTML = "";
      messages.forEach((message) => {
        if (
          (message.from ===
            JSON.parse(localStorage.getItem("currentUser")).username &&
            message.to === activeUser) ||
          (message.to === JSON.parse(localStorage.getItem("currentUser")).username &&
            message.from === activeUser)
        ) {
          const messageElement = document.createElement("div");
          messageElement.className = "message";
          messageElement.textContent = `${message.from}: ${message.text} (${message.time})`;
          messagesContainer.appendChild(messageElement);
        }
      });
    }else{
        console.log("No Container")
    }
  }

  function displayRegisteredUsers() {
    console.log("Logging");
    const usersContainer = document.getElementById("usersLst");

    if (usersContainer) {
      usersContainer.innerHTML = "";

      userslst.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.className = "contact-item";

        const avatar = document.createElement("div");
        avatar.className = "contact-avatar";
        avatar.textContent = user.username.charAt(0).toUpperCase();

        const username = document.createElement("div");
        username.className = "contact-name";
        username.textContent = user.username;

        userElement.appendChild(avatar);
        userElement.appendChild(username);
        usersContainer.appendChild(userElement);
        userElement.onclick = () => selectUser(user.username);
      });
    } else {
      console.error("Contacts list container not found!");
    }
  }

  function logout() {
      localStorage.removeItem('currentUser');
      window.location.href = "Login.html";
  }

  // */
  const btn=document.getElementById('sendBtn')
  btn.onclick=()=>{sendMessage()}
  window.onload = displayRegisteredUsers();

});
