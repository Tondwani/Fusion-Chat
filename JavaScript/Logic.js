document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', logout);
    const searchInput = document.getElementById('searchInput');
    const contactItems = document.querySelectorAll('.contact-item');
});

document.getElementById('attachBtn').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        console.log('PDF attached:', file.name);
    } else {
        alert('Please select a PDF file.');
    }
});

// Search functionality
searchContacts(searchTerm) ;{
    this.contactItems.forEach(contact => {
        const contactName = contact.querySelector('span').textContent.toLowerCase();
        const matches = contactName.includes(searchTerm.toLowerCase());
        contact.style.display = matches ? 'flex' : 'none';
    });
}

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        searchContacts(searchTerm);
    }
});

// Real-time updates simulation
startRealTimeUpdates() ;{
    setInterval(() => {
        this.checkForNewMessages();
    }, 2000); // Check every 3 seconds
}

