document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const backgroundVideo = document.querySelector('.background-video');
    const header = document.querySelector('.header');
    const menu = document.querySelector('.menu');
    let lastScrollY = window.scrollY;

    // Set initial video
    const setBackgroundVideo = (videoSrc) => {
        backgroundVideo.classList.remove('visible');
        setTimeout(() => {
            backgroundVideo.src = videoSrc;
            backgroundVideo.classList.add('visible');
        }, 800); // Match the fade-out duration
    };

    // Initialize first video
    setBackgroundVideo("videos/video1.mp4");

    // Smooth video transitions as you scroll
    sections.forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    const videoSrc = section.getAttribute('data-video');
                    setBackgroundVideo(videoSrc);
                },
            },
        });
    });

    // Hide/Show Header on Scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Toggle Menu
    window.toggleMenu = () => {
        menu.classList.toggle('hidden');
    };
});