// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const navItems = document.querySelectorAll('.nav-links li a');
const form = document.querySelector('.contact-form form');
const highlightText = document.querySelector('.highlight');
const themeToggle = document.querySelector('.theme-toggle');

// Dark Mode Toggle
function initThemeToggle() {
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    if (!highlightText) return;
    
    const originalText = highlightText.textContent;
    highlightText.textContent = '';
    highlightText.classList.add('typing-animation');
    
    let charIndex = 0;
    const typingSpeed = 100; // milliseconds per character
    
    function typeText() {
        if (charIndex < originalText.length) {
            highlightText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 500);
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
});

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('nav-active');
        }
    });
});

// Sticky Header on Scroll
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.8rem 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '1rem 0';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Form Submission
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill out all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For demonstration purposes, we'll just show a success message
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1500);
    });
}

// Animation on Scroll Functions
// Add animation classes to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .about-image, .about-text, .project-card, .contact-item, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animations
const setupAnimations = () => {
    const elements = document.querySelectorAll('.section-title, .about-image, .about-text, .project-card, .contact-item, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animations for elements in viewport on load
    animateOnScroll();
};

// Typed.js effect for the hero section (if using the library)
// You can uncomment this if you add the Typed.js library to your project
/*
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Typed !== 'undefined') {
        new Typed('.tagline', {
            strings: ['Developer', 'Creator', 'Designer', 'Problem Solver'],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true
        });
    }
});
*/

// Handle project card hover effects for touch devices
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.toggle('touch-hover');
        
        projectCards.forEach(otherCard => {
            if (otherCard !== this && otherCard.classList.contains('touch-hover')) {
                otherCard.classList.remove('touch-hover');
            }
        });
    }, { passive: true });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTypingAnimation();
    setupAnimations();
    
    // Trigger animations on scroll
    window.addEventListener('scroll', animateOnScroll);
});
