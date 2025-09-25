// NOVÁ LOGIKA PRO HAMBURGER MENU
const hamburgerButton = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
});

// Plynulé rolování na stránce A ZAVŘENÍ MENU
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // ZAVŘÍT MENU po kliknutí na odkaz (pro mobilní zobrazení)
        if (mainNav.classList.contains('active')) {
             mainNav.classList.remove('active');
             hamburgerButton.classList.remove('active');
        }
        
        // Plynulé rolování
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animace prvků při rolování (beze změny)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sluzba-card, .step-card, .testimonial-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.2 // Karta se objeví, když je 20 % viditelných
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});