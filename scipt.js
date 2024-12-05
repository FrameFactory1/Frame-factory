document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const backgroundVideo = document.querySelector('.background-video');
    const header = document.querySelector('.header');
    const menu = document.querySelector('.menu');
    let lastScrollY = window.scrollY;

    // Set a default video
    backgroundVideo.src = "videos/video1.mp4";
    backgroundVideo.play();

    // Smooth video transitions as you scroll
    sections.forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    const videoSrc = section.getAttribute('data-video');
                    backgroundVideo.src = videoSrc;
                    backgroundVideo.play();
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

    // Play Background Video Fullscreen on Click
    backgroundVideo.addEventListener('click', () => {
        backgroundVideo.muted = false;
        backgroundVideo.classList.add('fullscreen');

        const requestFullscreen =
            backgroundVideo.requestFullscreen ||
            backgroundVideo.webkitRequestFullscreen ||
            backgroundVideo.mozRequestFullScreen ||
            backgroundVideo.msRequestFullscreen;

        if (requestFullscreen) {
            requestFullscreen.call(backgroundVideo);
        }
    });

    // Reset video state on scroll
    window.addEventListener('scroll', () => {
        backgroundVideo.muted = true;
        backgroundVideo.classList.remove('fullscreen');
    });

    // Toggle Menu
    window.toggleMenu = () => {
        menu.classList.toggle('hidden');
    };
});