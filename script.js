// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';

// Apply saved theme on page load
if (currentTheme === 'dark-mode') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light-mode');
    } else {
        // Switch to dark mode
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark-mode');
    }
});

// Rotating text animation
const rotatingText = document.querySelector('.rotating-text');
const phrases = [
    'Developing, building and chilling 🥐.',
    'Writing code and coffee ☕',
    'Cringe a bit 😅',
    'AI/ML developer 💻'
];

let phraseIndex = 0;

function rotateText() {
    if (rotatingText) {
        rotatingText.style.opacity = '0';
        setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            rotatingText.textContent = phrases[phraseIndex];
            rotatingText.style.opacity = '0.9';
        }, 500);
    }
}

// Change phrase every 4 seconds (after typing animation completes)
setTimeout(() => {
    setInterval(rotateText, 4000);
}, 3500);
