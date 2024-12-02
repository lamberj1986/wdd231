// Set Timestamp on Page Load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toISOString();
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add Simple Animation for Cards
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});