// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('show');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.room-card, .service-card, .booking-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('confirmationModal');
const closeModal = document.querySelector('.close');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        modal.style.display = 'block';
    }
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Dynamic copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Form validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const checkIn = document.getElementById('check-in');
    const checkOut = document.getElementById('check-out');
    const roomType = document.getElementById('room-type');

    if (name.value.trim() === '') {
        isValid = false;
        showError(name, 'Por favor, ingresa tu nombre completo');
    } else {
        removeError(name);
    }

    if (email.value.trim() === '' || !isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Por favor, ingresa un correo electrónico válido');
    } else {
        removeError(email);
    }

    if (checkIn.value === '') {
        isValid = false;
        showError(checkIn, 'Por favor, selecciona una fecha de llegada');
    } else {
        removeError(checkIn);
    }

    if (checkOut.value === '') {
        isValid = false;
        showError(checkOut, 'Por favor, selecciona una fecha de salida');
    } else if (new Date(checkOut.value) <= new Date(checkIn.value)) {
        isValid = false;
        showError(checkOut, 'La fecha de salida debe ser posterior a la fecha de llegada');
    } else {
        removeError(checkOut);
    }

    if (roomType.value === '') {
        isValid = false;
        showError(roomType, 'Por favor, selecciona un tipo de habitación');
    } else {
        removeError(roomType);
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}