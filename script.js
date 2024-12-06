document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu Click Event
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const video = document.querySelector('.background-video');
    const sections = document.querySelectorAll('.section');
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
        section.style.display = 'flex';
        section.style.opacity = 1;
        section.style.transform = 'translateX(0)';
    });

    // Click anywhere to toggle filter
    document.addEventListener('click', function(e) {
        // Ignoriere Klicks auf das Menü und den Burger-Button
        if (!e.target.closest('.menu') && !e.target.closest('.burger-menu')) {
            video.classList.toggle('active');
        }
    });

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