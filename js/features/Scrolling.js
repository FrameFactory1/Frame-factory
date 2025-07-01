const backgroundVideo = document.getElementById("background-video");
const sections = document.querySelectorAll('.section');
let activeVideo = null;

import { actualizePaddingTop } from '../utils/sectionPadding.js';
import { headerID } from '../init/domRefs.js';

let lastScrollY = window.scrollY; //speichert die letzte bekannte Y-Scrollposition der Seite
let touchStartY = 0; //speichern die Y-Positionen beim Start einer Touch-Geste
let touchEndY = 0; //speichern die Y-Positionen beim Ende einer Touch-Geste


    // === Header beim Scrollen aus-/einblenden ===
    window.addEventListener('scroll', () => { // Aktiviert Eventlistener für Fenster: schaut konstant, ob auf Fensterebene gescrollt wird)
        const currentScrollY = window.scrollY; // stellt die akutelle Scrollposition des Scrolls fest
        if (currentScrollY > lastScrollY) { // wenn die Position tiefer (Pixelanzahl = höher) ist, als die letzte Scrollposition
            headerID.classList.add('hidden'); // setze füge hidden-class hinzu
            sections.forEach(section => {
                section.style.paddingTop = 0;
            });
        } else { // wenn die Position höher (oder gleichhoch, sehr unwahrscheinlich = vernachlässigbar) ist
            headerID.classList.remove('hidden'); // entferne hidden-class
            actualizePaddingTop();
        }
        lastScrollY = currentScrollY; // setze die Modulweite Konsante auf die letzte Scrollposition
    });

    // === Sichtbare Section auslesen ===
    export function viewportLocation () {
        // 1) Alle Sektionen in ein Array packen
        const sectionsArray = Array.from(sections);

        // 2) IntersectionObserver aufsetzen
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 3) Index der aktuellen Section im Array finden
                const idx = sectionsArray.indexOf(entry.target);
                console.log('Aktive Section:', idx);
                switchVideo (entry.target, idx);
            }
            });
        }, {
            root: null,
            threshold: 0.5
        });

        // 4) Observer starten
        sectionsArray.forEach(sec => observer.observe(sec));
    };


    
    // Hintergrund-Video Selector
    export function switchVideo ( sectionElement, i ) { // sections[i] oder ids
        const videoSrc = sectionElement.dataset.video;
        console.log('Switch-Video Loaded for:', i + " : " + sectionElement);
        if (!sectionElement.hasAttribute('data-video')) {console.warn("Sektion hat keine Video Src.");
            if (backgroundVideo.classList.contains("active")) {
                backgroundVideo.pause();
                backgroundVideo.classList.toggle("active");
            }
        }

                if (videoSrc == activeVideo) {
                    return;};

        if (backgroundVideo.classList.contains("active")) {
            // CSS Transition Video -> Video wird aktiviert
                backgroundVideo.classList.toggle("active"); //CSS transitionsetTimeout (() =>{
                setTimeout (() =>{
                backgroundVideo.pause();
                backgroundVideo.src = videoSrc;                
                backgroundVideo.load(); // Startet Ladeprozess
                }, 1000);
                    console.log('Video wird geswitcht: '+ activeVideo + " -> " + videoSrc);
                setTimeout (() =>{
                backgroundVideo.classList.toggle("active");
                }, 1000);
                } else {
                    // erstes Video wird aktiviert
                    backgroundVideo.src = videoSrc;
                    backgroundVideo.load(); // Startet Ladeprozess
                    console.log('Video wird aktiviert: ' + videoSrc);
                    backgroundVideo.classList.toggle("active");
                }
                    activeVideo = videoSrc;
            }