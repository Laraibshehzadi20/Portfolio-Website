document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                if (window.innerWidth <= 768) {
                    navToggle.classList.remove('toggle');
                    navLinks.classList.remove('nav-active');
                    navLinks.querySelectorAll('li').forEach((link, index) => {
                        link.style.animation = ''; // Reset animation
                    });
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    navToggle.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');

        // Animate Links
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        navToggle.classList.toggle('toggle');
    });

    // Close mobile nav when clicking outside (optional, but good UX)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('nav-active')) {
            navToggle.classList.remove('toggle');
            navLinks.classList.remove('nav-active');
            navItems.forEach((link) => {
                link.style.animation = '';
            });
        }
    });

    // Optional: Add a subtle animation to sections as they scroll into view
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Optional: remove class when out of view
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });

    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Add initial class for styling
        observer.observe(section);
    
    });
});