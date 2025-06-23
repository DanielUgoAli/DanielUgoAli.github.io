document.addEventListener('DOMContentLoaded', function() {
    // Add typing animation for the highlighted name
    const typingText = document.getElementById('typing-text');
    const textToType = "Dan's Space";
    let i = 0;
    let speed = 150; // Typing speed in milliseconds
    
    function typeWriter() {
        if (i < textToType.length) {
            typingText.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start the typing animation
    setTimeout(typeWriter, 1000); // Delay before starting
    
    // Initialize skill tags with staggered animation delays
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        // Set random animation delay for each tag
        const delay = (index * 0.2) % 2; // Stagger by 0.2s, cycle every 2 seconds
        tag.style.setProperty('--delay', delay);
        
        // Add click effect for skill tags
        tag.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add theme toggle button with enhanced styling
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference, otherwise default to dark mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateToggleButton(savedTheme);
    } else {
        // No saved theme, default to dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleButton('dark');
    }

    // Theme toggle functionality with animation
    themeToggle.addEventListener('click', () => {
        // Add a click animation
        themeToggle.classList.add('clicked');
        
        // Remove the animation class after it completes
        setTimeout(() => {
            themeToggle.classList.remove('clicked');
        }, 500);
        
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });

    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.classList.add('dark');
            document.querySelector('.theme-toggle i').style.color = 'white';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.classList.remove('dark');
            document.querySelector('.theme-toggle i').style.color = '';
        }
    }    
});
