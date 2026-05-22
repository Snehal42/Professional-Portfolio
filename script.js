// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Dark Mode Toggle
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});

// Scroll Reveal
ScrollReveal().reveal('.reveal', {
    distance: '50px',
    duration: 900,
    interval: 200,
    origin: 'bottom'
});