document.addEventListener('DOMContentLoaded', function() {
    // Burger Menu Click Event
    const burgerMenu = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const video1 = document.querySelector('.background-video');
    const video2 = document.querySelector('.background-video.video2');
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    // Video popup elements
    const videoPopup = document.querySelector('.video-player-popup');
    const videoContainer = document.querySelector('.video-player-container');
    const popupVideo = document.querySelector('.popup-video');
    const closeVideo = document.querySelector('.close-video');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const descriptionBox = document.querySelector('.video-description-box');

    // Touch handling variables
    let touchStartY = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50;

    // Helper function to check if device is mobile
    const isMobile = () => window.innerWidth <= 768;

    // Video popup functionality
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation();
            const videoSrc = sections[index].getAttribute('data-video');
            const section = sections[index];
            const title = section.querySelector('h1').textContent;
            const description = section.querySelector('p').textContent;
            
            if (isMobile()) {
                // Mobile: Direct full screen without animation
                videoPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Set video source
                popupVideo.src = videoSrc;
                
                // Set video container to full screen immediately
                gsap.set(videoContainer, {
                    width: window.innerWidth,
                    height: window.innerWidth * (9/16),
                    x: 0,
                    y: 0,
                    opacity: 1,
                    visibility: 'visible'
                });
                
                // Show video and start playing
                videoContainer.classList.add('active');
                popupVideo.classList.add('active');
                closeVideo.classList.add('active');
                popupVideo.play();
                
                // Store reference
                thumbnail.setAttribute('data-active', 'true');
                return;
            }
            
            // Desktop version continues with existing animation code...
            const thumbRect = thumbnail.getBoundingClientRect();
            
            // Set video source first
            popupVideo.src = videoSrc;
            
            // Calculate dimensions and spacing
            const borderSpacing = 60;
            const elementSpacing = 30;
            const finalWidth = Math.min(window.innerWidth * 0.9, 1200);
            const finalHeight = finalWidth * (9/16);
            const startY = borderSpacing;
            const finalX = (window.innerWidth - finalWidth) / 2;
            
            // Show popup background first
            videoPopup.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Desktop: Set description content and position
            descriptionBox.querySelector('h2').textContent = title;
            descriptionBox.querySelector('p').textContent = description;
            
            // Force description box layout calculation
            descriptionBox.style.visibility = 'hidden';
            descriptionBox.style.display = 'block';
            const descriptionHeight = descriptionBox.offsetHeight;
            descriptionBox.style.display = '';
            descriptionBox.style.visibility = '';

            // Set initial position for description box (behind the thumbnail)
            gsap.set(descriptionBox, {
                width: finalWidth,
                x: finalX,
                y: thumbRect.top + (thumbRect.height / 2),
                opacity: 0,
                visibility: 'visible',
                zIndex: 1
            });

            // Set initial position and size of video container to match thumbnail
            gsap.set(videoContainer, {
                width: thumbRect.width,
                height: thumbRect.height,
                x: thumbRect.left,
                y: thumbRect.top,
                opacity: 1,
                zIndex: 2
            });

            // Make video container and video visible
            videoContainer.classList.add('active');
            popupVideo.classList.add('active');
            
            // Start playing the video
            popupVideo.play();

            // Desktop: Animate both video and description
            const tl = gsap.timeline();
            
            tl.to(descriptionBox, {
                y: startY + finalHeight + elementSpacing,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    descriptionBox.classList.add('active');
                }
            }, 0);

            tl.to(videoContainer, {
                width: finalWidth,
                height: finalHeight,
                x: finalX,
                y: startY,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    closeVideo.classList.add('active');
                }
            }, 0);

            // Store reference to clicked thumbnail
            thumbnail.setAttribute('data-active', 'true');
        });
    });

    function closeVideoPlayer() {
        const activeThumb = document.querySelector('.thumbnail[data-active="true"]');
        
        // For mobile devices, close immediately without animation
        if (isMobile()) {
            // Stop video and clean up immediately
            popupVideo.pause();
            popupVideo.classList.remove('active');
            videoContainer.classList.remove('active');
            videoPopup.classList.remove('active');
            closeVideo.classList.remove('active');
            descriptionBox.classList.remove('active');
            descriptionBox.style.visibility = 'hidden';
            document.body.style.overflow = '';
            popupVideo.src = '';
            if (activeThumb) {
                activeThumb.removeAttribute('data-active');
            }
            return;
        }
        
        // Desktop closing animation
        closeVideo.classList.remove('active');
        descriptionBox.classList.remove('active');
        gsap.to(descriptionBox, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                descriptionBox.style.visibility = 'hidden';
            }
        });
        
        if (activeThumb) {
            const thumbRect = activeThumb.getBoundingClientRect();
            
            // Animate back to thumbnail position
            gsap.to(videoContainer, {
                width: thumbRect.width,
                height: thumbRect.height,
                x: thumbRect.left,
                y: thumbRect.top,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Stop video and clean up
                    popupVideo.pause();
                    popupVideo.classList.remove('active');
                    videoContainer.classList.remove('active');
                    videoPopup.classList.remove('active');
                    document.body.style.overflow = '';
                    popupVideo.src = '';
                    activeThumb.removeAttribute('data-active');
                }
            });
        } else {
            // Fallback if thumbnail not found
            popupVideo.pause();
            popupVideo.classList.remove('active');
            videoContainer.classList.remove('active');
            videoPopup.classList.remove('active');
            document.body.style.overflow = '';
            popupVideo.src = '';
        }
    }

    closeVideo.addEventListener('click', closeVideoPlayer);

    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            closeVideoPlayer();
        }
    });

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

    // Initialize sections
    sections.forEach((section) => {
        section.style.display = 'flex';
        section.style.opacity = 1;
        section.style.transform = 'translateX(0)';
    });

    // Function to fade between videos
    function switchVideo(videoToShow, videoToHide) {
        gsap.to(videoToHide, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                videoToHide.style.zIndex = 1;
            }
        });
        
        gsap.to(videoToShow, {
            opacity: 1,
            duration: 0.5,
            onStart: () => {
                videoToShow.style.zIndex = 2;
                videoToShow.play().catch(e => console.log('Autoplay prevented:', e));
            }
        });
    }

    // Smooth video transitions on scroll
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                if (index === 0) {
                    switchVideo(video1, video2);
                } else {
                    switchVideo(video2, video1);
                }
            },
            onEnterBack: () => {
                if (index === 0) {
                    switchVideo(video1, video2);
                } else {
                    switchVideo(video2, video1);
                }
            }
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

    // Touch event handlers for swipe detection
    videoContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, false);

    videoContainer.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        
        // Calculate swipe distance
        const swipeDistance = touchEndY - touchStartY;
        
        if (swipeDistance > minSwipeDistance) {
            // Swipe up detected, close the video
            closeVideoPlayer();
        }
    }, false);
});