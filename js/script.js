document.addEventListener('DOMContentLoaded', () => {
    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 7, 18, 0.95)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(3, 7, 18, 0.8)';
            navbar.style.padding = '0';
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('toggle');
        });
    }

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-category, .info-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add class for intersection observer
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: -1;
            transition: width 0.3s, height 0.3s;
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: var(--primary-bg);
                padding: 2rem;
                border-bottom: 1px solid var(--glass-border);
            }
            .nav-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                background: var(--text-main);
                margin: 5px 0;
                transition: 0.4s;
            }
            .nav-toggle.toggle span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
            .nav-toggle.toggle span:nth-child(2) { opacity: 0; }
            .nav-toggle.toggle span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
        }
    `;
    document.head.appendChild(style);

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-num');
    const revealStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-val');
                let count = 0;
                const speed = 2000 / target;
                
                const updateCount = () => {
                    const increment = target / 100;
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, speed / 100);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                revealStats.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => revealStats.observe(stat));

    // Form Submission (Simulated)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalText = contactForm.querySelector('button').innerHTML;
            contactForm.querySelector('button').innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem; background: var(--secondary-bg); border-radius: 12px; border: 1px solid var(--accent-blue);">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: var(--accent-blue); margin-bottom: 1rem;"></i>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you, Snehal will get back to you soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // Smooth scroll for nav links (already handled by CSS scroll-behavior, but good to ensure)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                navToggle.classList.remove('toggle');
            }
        });
    });
});
