document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logoutBtn');
    logoutButton.addEventListener('click', logout);
    const searchInput = document.getElementById('searchInput');
    const contactItems = document.querySelectorAll('.contact-item');
    const attachBtn = document.getElementById('attachBtn');
    const fileInput = document.getElementById('fileInput');
});

    if (attachBtn && fileInput) {
        attachBtn.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file && file.type === 'application/pdf') {
                console.log('PDF attached:', file.name);
            } else {
                alert('Please select a PDF file.');
            }
        });
    }

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



