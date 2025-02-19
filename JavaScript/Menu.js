document.addEventListener("DOMContentLoaded", () => {
    let activeUser = null;
    const groupChatName = "Fusion Group Chat"; 
  
    function addUserToGroupChat(username) {
      let groupChatUsers = JSON.parse(localStorage.getItem("groupChatUsers")) || [];
     
      if (!groupChatUsers.includes(username)) {
        groupChatUsers.push(username);
        localStorage.setItem("groupChatUsers", JSON.stringify(groupChatUsers));
      }
    }
  
    function sendMessage() {
      const input = document.getElementById("messageInput");
      const message = input.value;
      if (message === "" || !activeUser) return;
  
      const currentUser = JSON.parse(localStorage.getItem("currentUser")).username;
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      const timestamp = new Date().toLocaleTimeString();
  
      if (activeUser === groupChatName) {
        // Store group messages
        messages.push({
          from: currentUser,
          to: "Group Chat",
          text: message,
          time: timestamp,
        });
      } else {
        // Store private messages
        messages.push({
          from: currentUser,
          to: activeUser,
          text: message,
          time: timestamp,
        });
      }
  
      localStorage.setItem("messages", JSON.stringify(messages));
      input.value = "";
      loadMessages();
    }
  
    function loadMessages() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")).username;
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      const messagesContainer = document.getElementById("messages-container");
  
      if (messagesContainer) {
        messagesContainer.innerHTML = "";
        messages.forEach((message) => {
          if (
            (message.from === currentUser && message.to === activeUser) ||
            (message.to === currentUser && message.from === activeUser) ||
            (activeUser === groupChatName && message.to === "Group Chat")
          ) {
            const messageElement = document.createElement("div");
            messageElement.className = "message";
            messageElement.textContent = `${message.from}: ${message.text} (${message.time})`;
            messagesContainer.appendChild(messageElement);
          }
        });
      }
    }
  
    function displayRegisteredUsers() {
      console.log("Logging");
      const usersContainer = document.getElementById("usersLst");
  
      if (usersContainer) {
        usersContainer.innerHTML = "";
  
        const groupElement = document.createElement("div");
        groupElement.className = "contact-item";
        groupElement.textContent = "📢 Group Chat";
        groupElement.onclick = () => selectUser(groupChatName);
        usersContainer.appendChild(groupElement);
  
        const userslst = JSON.parse(localStorage.getItem("users")) || [];
        userslst.forEach((user) => {
          const userElement = document.createElement("div");
          userElement.className = "contact-item";


          const avatar = document.createElement("div");
          avatar.className = "contact-avatar";
          avatar.innerHTML = '<i class="fas fa-user"></>';
          avatar.onclick =  function() {
            window.location.href = "User.html";
          }
  
          const username = document.createElement("div");
          username.className = "contact-name";
          username.textContent = user.username;
  
          userElement.appendChild(avatar);
          userElement.appendChild(username);
          usersContainer.appendChild(userElement);
          userElement.onclick = () => selectUser(user.username);
  

          addUserToGroupChat(user.username);
        });
      } else {
        console.error("Contacts list container not found!");
      }
    }
  
    function selectUser(user) {
      activeUser = user;
      localStorage.setItem("activeChat", activeUser);
      loadMessages();
      document.getElementById('chatHeader').innerHTML = user;
      document.querySelectorAll(".contact-item").forEach(el => el.classList.remove("contact-active"));
    }
  
    function logout() {
      localStorage.removeItem("currentUser");
      window.location.href = "Login.html";
    }
  
    document.getElementById("sendBtn")?.addEventListener("click", sendMessage);
  
    window.onload = () => {
      displayRegisteredUsers();
      activeUser = localStorage.getItem("activeChat") || groupChatName;
      loadMessages();
    };
  });