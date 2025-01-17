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
        const section = sections[index];
        const pullDownIcon = section.querySelector('.pull-down-icon');
        const sectionContent = section.querySelector('.section-content');

        if (isMobile()) {
            // Add initial bounce animation class
            pullDownIcon.classList.add('initial-animation');
            
            // Remove animation after it completes
            setTimeout(() => {
                pullDownIcon.classList.remove('initial-animation');
            }, 2000);

            // Add click handler for pull-down icon on mobile
            pullDownIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoSrc = sections[index].getAttribute('data-video');
                
                if (!sectionContent.classList.contains('show')) {
                    // Opening state
                    sectionContent.classList.add('show');
                    pullDownIcon.classList.add('active');

                    // Show video player
                    videoPopup.style.display = 'block';
                    videoPopup.classList.add('active');
                    
                    // Set video source and load first frame
                    popupVideo.src = videoSrc;
                    popupVideo.preload = 'auto';
                    
                    // Position video container exactly where the thumbnail is
                    const thumbRect = thumbnail.getBoundingClientRect();
                    const thumbWrapper = thumbnail.closest('.thumbnail-wrapper');
                    
                    // Insert video container into the thumbnail wrapper
                    thumbWrapper.appendChild(videoContainer);
                    
                    // Position the video container
                    videoContainer.style.width = '100%';
                    videoContainer.style.height = 'auto';
                    videoContainer.style.top = '0';
                    videoContainer.style.left = '0';
                    
                    // Reset video container transform before inserting
                    videoContainer.style.transform = 'rotateY(-180deg)';
                    videoContainer.classList.remove('moved');
                    
                    // Force browser reflow
                    videoContainer.offsetHeight;
                    
                    // Step 1: Flip animation
                    requestAnimationFrame(() => {
                        thumbnail.classList.add('hidden');
                        videoContainer.classList.add('active');
                        videoContainer.style.transform = 'rotateY(0)';
                        popupVideo.classList.add('active');
                        closeVideo.classList.add('active');
                        
                        // Step 2: Move video up and prepare content
                        setTimeout(() => {
                            videoContainer.classList.add('moved');
                            
                            // Show content
                            sectionContent.classList.add('show');
                            
                            // Step 3: Slide content into view
                            requestAnimationFrame(() => {
                                sectionContent.classList.add('visible');
                            });
                        }, 600);
                    });

                    // Load the first frame
                    popupVideo.addEventListener('loadeddata', function onLoadedData() {
                        popupVideo.currentTime = 0;
                        popupVideo.removeEventListener('loadeddata', onLoadedData);
                    });
                    
                    // Store reference
                    thumbnail.setAttribute('data-active', 'true');
                } else {
                    // Closing state
                    sectionContent.classList.remove('visible');
                    pullDownIcon.classList.remove('active');
                    
                    // Wait for content to slide back
                    setTimeout(() => {
                        videoContainer.classList.remove('moved');
                        
                        // Wait for movement to complete
                        setTimeout(() => {
                            sectionContent.classList.remove('show');
                            
                            // Reverse flip animation
                            videoContainer.style.transform = 'rotateY(-180deg)';
                            thumbnail.style.transform = 'rotateY(0)';
                            thumbnail.classList.remove('hidden');
                            
                            // Clean up after animation
                            setTimeout(() => {
                                popupVideo.pause();
                                popupVideo.classList.remove('active');
                                videoContainer.classList.remove('active');
                                videoPopup.style.display = 'none';
                                videoPopup.classList.remove('active');
                                closeVideo.classList.remove('active');
                                popupVideo.src = '';
                                thumbnail.removeAttribute('data-active');
                                // Reset transforms
                                videoContainer.style.transform = '';
                                thumbnail.style.transform = '';
                                // Remove video container
                                if (videoContainer.parentNode) {
                                    videoContainer.parentNode.removeChild(videoContainer);
                                }
                            }, 600);
                        }, 300);
                    }, 600);
                }
            });

            // Remove the thumbnail click handler for mobile
            thumbnail.style.pointerEvents = 'none';
        } else {
            // Desktop version continues with existing code...
            thumbnail.addEventListener('click', (e) => {
                // ... existing desktop click handler code ...
            });
        }
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