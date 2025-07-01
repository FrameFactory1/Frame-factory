// === Imports HTML-Elemente === 
import {
    thumbnails,
    sections,
    popupVideo,
    videoPopup,
    videoContainer,
    closeVideo,
    descriptionBox
} from '../init/domRefs.js';

// === Imports feste Werte und Hilfsfunktionen ===
import {
    ANIM_SHORT,        // Dauer für kurze Animationen
    ANIM_MEDIUM,       // Dauer für mittlere Animationen
    minSwipeDistance,  // Minimale Wischdistanz auf Mobilgeräten
    isMobile           // Funktion, die prüft, ob die Seite auf einem Mobilgerät angezeigt wird
} from '../utils/constants.js';

// === Zustände zum Scrollen und Berühren speichern ===
let lastScrollY = window.scrollY; // Aktuelle Scrollposition beim Laden speichern
let touchStartY = 0;              // Position beim Beginn eines Touch-Events (Finger berührt den Bildschirm)
let touchEndY = 0;                // Position beim Ende eines Touch-Events (Finger losgelassen)




// === Funktion zum Initialisieren der Video-Popup-Funktion für Mobilgeräte ===

export function initVideoPopupMobile() {

    // Kontrolle für Schließbutton im HTML-Code
    if (closeVideo) {
        // Füge dem Button eine sogenannte ARIA-Beschreibung hinzu (für Barrierefreiheit, z. B. Screenreader)
        closeVideo.setAttribute('aria-label', 'Close video');
    }
    
    // ==== Interaktion: Thumbnail klick/tap ====

    // Für jedes Vorschaubild (Thumbnail) und dessen Index in der Liste:
    thumbnails.forEach((thumbnail, index) => {
         // Fokussiere den entsprechenden Bereich auf der Seite (z. B. ein Abschnitt mit Text und Bild)
        const section = sections[index];
        // Innerhalb dieses Bereichs:
        // - Finde das Icon mit dem nach unten zeigenden Pfeil
        const pullDownIcon = section.querySelector('.pull-down-icon');
        // - Finde den Container mit dem eigentlichen Inhalt
        const sectionContent = section.querySelector('.section-content');
        // - Finde den Wrapper (die Umhüllung) des Thumbnails
        const thumbWrapper = thumbnail.closest('.thumbnail-wrapper');

        // === Tippen auf Pfeil zeigt/verbirgt Video ===
            // Pfeil-Animation zu Beginn:
            // - Füge Pfeil CSS-Klasse für Animation zu
            pullDownIcon.classList.add('initial-animation');
            // - Nach 2000ms die Animation abschließen (= CSS-Klasse entfernen)
            setTimeout(() => pullDownIcon.classList.remove('initial-animation'), 2000);

            pullDownIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Verhindert, dass die Klicken-Interaktion Aktionen in äußeren Klassen auslöst

                // Speichern der Video-URL aus dem HTML-Attribut
                const videoSrc = section.getAttribute('data-video');

                // Verhindert, dass weitere Interaktionen zu Aktionen führen können (schützt korrekte Funktionsweise der Animation)
                if (sectionContent.classList.contains('animating')) return;

                // Markiere: Animation läuft gerade
                sectionContent.classList.add('animating');

                // Entferne das animating-Flag wieder nach der doppelten Animationszeit
                setTimeout(() => sectionContent.classList.remove('animating'), ANIM_MEDIUM * 2);

                // gibt es ein DOM-Element in dieser Sektion, für welches eine "show"-Klasse existiert? 
                if (!sectionContent.classList.contains('show')) {
                    // Video anzeigen: Anzeige Klassen hinzufügen und Video abspielen
                    sectionContent.classList.add('show');
                    pullDownIcon.classList.add('active');
                    videoPopup.style.display = 'block';
                    videoPopup.classList.add('active');
                    popupVideo.src = videoSrc;
                    popupVideo.preload = 'auto';

                    // Video-Container dynamisch verschieben
                    if (videoContainer.parentNode !== thumbWrapper) {
                        thumbWrapper.appendChild(videoContainer);
                    }

                    // Initialposition setzen (für Rotation)
                    videoContainer.style.width = '100%';
                    videoContainer.style.height = 'auto';
                    videoContainer.style.top = '0';
                    videoContainer.style.left = '0';
                    videoContainer.style.transform = 'rotateY(-180deg)';
                    videoContainer.classList.remove('moved');
                    videoContainer.offsetHeight;
                    
                    // Animation starten
                    requestAnimationFrame(() => {
                        thumbnail.classList.add('hidden');
                        videoContainer.classList.add('active');
                        videoContainer.style.transform = 'rotateY(0)';
                        popupVideo.classList.add('active');
                        closeVideo.classList.add('active');

                        setTimeout(() => {
                            videoContainer.classList.add('moved');
                            requestAnimationFrame(() => {
                                sectionContent.classList.add('visible');
                            });
                        }, ANIM_MEDIUM);
                    });

                    // Video auf Anfang setzen sobald es geladen ist
                    popupVideo.addEventListener('loadeddata', function onLoadedData() {
                        popupVideo.currentTime = 0;
                        popupVideo.removeEventListener('loadeddata', onLoadedData);
                    });

                    thumbnail.setAttribute('data-active', 'true');
                } else {
                    // Schließen
                    sectionContent.classList.remove('visible');
                    pullDownIcon.classList.remove('active');

                    setTimeout(() => {
                        videoContainer.classList.remove('moved');

                        setTimeout(() => {
                            sectionContent.classList.remove('show');
                            videoContainer.style.transform = 'rotateY(-180deg)';
                            thumbnail.style.transform = 'rotateY(0)';
                            thumbnail.classList.remove('hidden');

                            setTimeout(() => {
                                popupVideo.pause();
                                popupVideo.classList.remove('active');
                                videoContainer.classList.remove('active');
                                videoPopup.style.display = 'none';
                                videoPopup.classList.remove('active');
                                closeVideo.classList.remove('active');
                                popupVideo.src = '';
                                thumbnail.removeAttribute('data-active');
                                if (videoContainer.parentNode) {
                                    videoContainer.parentNode.removeChild(videoContainer);
                                }
                            }, ANIM_MEDIUM);
                        }, ANIM_SHORT);
                    }, ANIM_MEDIUM);
                }
            });

            thumbnail.style.pointerEvents = 'none';
    });


    // === Events zum Schließen ===
    closeVideo.addEventListener('click', closeVideoPlayer);
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) closeVideoPlayer();
    });


    // === Swipe nach unten zum Schließen (mobil) ===
    videoContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    videoContainer.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        if (touchEndY - touchStartY > minSwipeDistance) closeVideoPlayer();
    });

    // Reset layout
    sections.forEach(section => {
        section.style.opacity = 1;
        section.style.transform = 'translateX(0)';
    });
}

// ==== Schließen-Funktion (mobil + desktop) ====
export function closeVideoPlayer() {
    const activeThumb = document.querySelector('.thumbnail[data-active="true"]');

    if (isMobile()) {
        // Mobil: alles zurücksetzen
        popupVideo.pause();
        popupVideo.classList.remove('active');
        videoContainer.classList.remove('active');
        videoPopup.classList.remove('active');
        closeVideo.classList.remove('active');
        descriptionBox.classList.remove('active');
        descriptionBox.style.visibility = 'hidden';
        document.body.style.overflow = '';
        popupVideo.src = '';
        if (activeThumb) activeThumb.removeAttribute('data-active');
        return;
    }
}