// === Eigene Module importieren ===
import { initMenuToggle } from './features/Menu.js'; //fertig
import { initVideoPopup } from './features/videoPopup.js';
import { viewportLocation } from './features/Scrolling.js'
import { pageLoadingVideo } from'./features/pageLoader.js'; //fertig, nicht aktiv
import { sections } from './init/domRefs.js';

export const loader = document.getElementById('loading-video');


// === Initiieren der Seite bei Aufruf ===

  document.addEventListener("DOMContentLoaded", () => { 
    viewportLocation()
    if (loader) { pageLoadingVideo() };  
    initMenuToggle();
    initVideoPopup();
    /*AutoScroll();*/
    window.scrollTo(0, 0) });