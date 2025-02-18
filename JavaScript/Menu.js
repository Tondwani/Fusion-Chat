document.addEventListener("DOMContentLoaded", () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userElement = document.getElementById("current-user");
        console.log(userElement); 
        if (currentUser && userElement) {
            userElement.textContent = currentUser.username;
        }
        loadMessages();
        updateOnlineUsers();
        displayRegisteredUsers();
    } catch (error) {
        console.error("Error loading user data:", error);
    }
});

let activeUser = null;

function selectUser(username) {
    activeUser = username;
    const userElements = document.querySelectorAll('.contact-item');
    userElements.forEach(userElement => {
        if (userElement.querySelector('.contact-name').textContent === username) {
            userElement.classList.add('contact-active');
        } else {
            userElement.classList.remove('contact-active');
        }
    });
    loadMessages();
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
  
    if (message === "" || !activeUser) return;

    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const timestamp = new Date().toLocaleTimeString();
    messages.push({
        from: JSON.parse(localStorage.getItem('currentUser')).username,
        to: activeUser,
        text: message,
        time: timestamp
    });
    localStorage.setItem("messages", JSON.stringify(messages));

    input.value = "";
    loadMessages();
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            if ((message.from === JSON.parse(localStorage.getItem('currentUser')).username && message.to === activeUser) ||
                (message.to === JSON.parse(localStorage.getItem('currentUser')).username && message.from === activeUser)) {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.textContent = `${message.from}: ${message.text} (${message.time})`;
                messagesContainer.appendChild(messageElement);
            }
        });
    }
}

function displayRegisteredUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersContainer = document.getElementById('contacts-list');
   
    if (usersContainer) {
        usersContainer.innerHTML = '';
       
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'contact-item';
            userElement.onclick = () => selectUser(user.username);
           
            const avatar = document.createElement('div');
            avatar.className = 'contact-avatar'; 
            avatar.textContent = user.username.charAt(0).toUpperCase();
           
            const username = document.createElement('div');
            username.className = 'contact-name';
            username.textContent = user.username;
           
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.username === user.username) {
                userElement.classList.add('contact-active'); 
                const onlineStatus = document.createElement('span');
                onlineStatus.className = 'contact-status'; 
                onlineStatus.textContent = '• Online';
                username.appendChild(onlineStatus);
            }
           
            userElement.appendChild(avatar);
            userElement.appendChild(username);
            usersContainer.appendChild(userElement);
        });
    } else {
        console.error("Contacts list container not found! Make sure you have an element with id 'contacts-list'");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "Login.html"; 
}
