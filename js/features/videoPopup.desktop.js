// === Imports
import {
    thumbnails,
    popupVideo,
    videoPopup,
    videoContainer,
    closeVideo,
    descriptionBox,
    videoContainerID
} from '../init/domRefs.js';

export const sections = document.querySelectorAll('.project');

// ==== Debugging:
document.addEventListener('DOMContentLoaded', () => {
    console.log('Simplified video popup loaded');
});

export function initVideoPopupDesktop() {
    if (closeVideo) {
        closeVideo.setAttribute('aria-label', 'Close video');
    }

    thumbnails.forEach((thumbnail, index) => {
        const section = sections[index];
        const videoSrc = section.getAttribute('data-video');
            console.log('checkpoint1 loaded');
            thumbnail.addEventListener('click', () => {
            console.log('checkpoint1 loaded');
            console.log("Opening video:", videoSrc);

            // Set video source and reset
            popupVideo.src = videoSrc;
            popupVideo.currentTime = 0;
            popupVideo.preload = 'auto';
            popupVideo.play().catch(e => console.log('Autoplay prevented:', e));
                        console.log('checkpoint2 loaded');

            // Show popup and animate
            thumbnail.classList.add('hidden');
            videoPopup.classList.add('active');
            videoContainer.classList.add('active');
            popupVideo.classList.add('active');
            closeVideo.classList.add('active');
            descriptionBox.classList.add('active');
                        console.log('checkpoint3 loaded');
            thumbnail.setAttribute('data-active', 'true');
        });
    });

    // === Events zum Schließen ===
    closeVideo.addEventListener('click', closeVideoPlayer);
}

export function closeVideoPlayer() {
    const activeThumb = document.querySelector('.thumbnail[data-active="true"]');

    popupVideo.pause();
    popupVideo.src = '';

    videoPopup.classList.remove('active');
    videoContainer.classList.remove('active');
    popupVideo.classList.remove('active');
    closeVideo.classList.remove('active');
    descriptionBox.classList.remove('active');
    descriptionBox.style.visibility = 'hidden';

    if (activeThumb) {
        activeThumb.classList.remove('hidden');
        activeThumb.removeAttribute('data-active');
    }
};


 // Layout des Thumbnails auf Layout des Videoplayerpopups anwenden
 /* 1. Thumbnail drehen
    2. Thumbnail langsam größer werdende transition zu Videoplayer Layout mit aktiv Klasse
    3. 

 /*export function assignSize( thumb ) {
    const rect = videoContainerID.getBoundingClientRect();
    thumb.style.width  = `${rect.width}px`;
    thumb.style.height = `${rect.height}px`;
    thumb.style.width  = `${rect.width}px`;
    
}*/