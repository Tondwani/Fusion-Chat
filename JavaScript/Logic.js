document.addEventListener('DOMContentLoaded', function() {
    var signOutButton = document.getElementById('logoutBtn');
    signOutButton.addEventListener('click', logout);
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
