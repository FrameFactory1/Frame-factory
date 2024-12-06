// Mache toggleMenu global verfügbar
window.toggleMenu = function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    
    // Toggle Burger-Animation
    burgerMenu.classList.toggle('active');
    
    // Toggle Menu mit Animation
    menu.classList.toggle('hidden');
    
    // Animate Menu Items
    const menuItems = menu.querySelectorAll('a');
    menuItems.forEach((item, index) => {
        if (menu.classList.contains('hidden')) {
            gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.3,
                delay: index * 0.1
            });
        } else {
            gsap.to(item, {
                opacity: 0,
                x: -20,
                duration: 0.3
            });
        }
    });
}

// Warte bis das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu Click Event
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const video = document.querySelector('.background-video');
    const sections = document.querySelectorAll('.section');
    const toggleBtn = document.querySelector('.video-toggle-btn');
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    // Burger Menu Handler
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        
        const menuItems = menu.querySelectorAll('a');
        menuItems.forEach((item, index) => {
            if (menu.classList.contains('active')) {
                gsap.to(item, {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    delay: index * 0.1
                });
            } else {
                gsap.to(item, {
                    opacity: 0,
                    x: -20,
                    duration: 0.3
                });
            }
        });
    });

    // GSAP ScrollTrigger registrieren
    gsap.registerPlugin(ScrollTrigger);

    // Initialisiere die Sections
    sections.forEach((section) => {
        // Stelle sicher, dass die Sections sichtbar sind
        section.style.display = 'flex';
        section.style.opacity = 1;
        section.style.transform = 'translateX(0)';
    });

    // Video Filter Toggle Handler
    if (toggleBtn && video) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button wurde geklickt');
            
            video.classList.toggle('active');
            this.textContent = video.classList.contains('active') ? 'Filter Ein' : 'Filter Aus';
            
            if (video.classList.contains('active')) {
                sections.forEach((section) => {
                    gsap.to(section, {
                        x: '100%',
                        opacity: 0,
                        duration: 0.7,
                        ease: "power2.inOut",
                        onComplete: () => {
                            section.style.display = 'none';
                        }
                    });
                });
            } else {
                sections.forEach((section) => {
                    section.style.display = 'flex';
                    gsap.fromTo(section, 
                        {
                            x: '100%',
                            opacity: 0
                        },
                        {
                            x: '0%',
                            opacity: 1,
                            duration: 0.7,
                            ease: "power2.inOut"
                        }
                    );
                });
            }
        });
    }

    // Smooth video transitions on scroll
    sections.forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    const videoSrc = section.getAttribute('data-video');
                    if (videoSrc) {
                        video.src = videoSrc;
                        video.play().catch(e => console.log('Autoplay prevented:', e));
                    }
                },
            },
        });
    });

    // Hide/Show Header on scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;
    });
});