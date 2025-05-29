// DOM Elements
const navbar = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    // Toggle Navigation
    navLinks.classList.toggle('active');

    // Burger Animation
    burger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar Active Link on Scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Background on Scroll
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Back to Top Button Visibility
function updateBackToTopBtn() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll Event Listener
window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
    updateBackToTopBtn();
    animateOnScroll();
});

// Back to Top Button Click
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved theme preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Portfolio Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonial Slider
let currentSlide = 0;
const slideWidth = 100; // percentage

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update dots
    testimonialDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    updateSlider();
}

// Testimonial Controls
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Testimonial Dots
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto slide testimonials
let testimonialInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
testimonialTrack.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialTrack.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextSlide, 5000);
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations on load
window.addEventListener('load', () => {
    animateOnScroll();
    updateNavbar();
    updateActiveLink();
});

// Form Validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;
        
        // Reset errors
        input.classList.remove('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.style.display = 'none';
        }
        
        // Check required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            if (errorElement) {
                errorElement.style.display = 'block';
            }
            isValid = false;
        }
        
        // Check email format
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('error');
                if (errorElement) {
                    errorElement.style.display = 'block';
                }
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // Get form values
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData);
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// Newsletter Form Handling
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(newsletterForm)) {
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            const formContainer = newsletterForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.textContent = 'Thank you for subscribing to our newsletter!';
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial slider
    updateSlider();
    
    // Initialize portfolio filter (show all items by default)
    document.querySelector('.filter-btn[data-filter="all"]').click();
});