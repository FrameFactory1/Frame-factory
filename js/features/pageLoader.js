import { LoadingVideo, loader } from '../init/domRefs.js';

export function pageLoadingVideo() {
      /* Anfangsvideo wird geladen */
        setTimeout(() => {
          loader.classList.add('hidden');     // ausblenden (per CSS Transition)
        }, 3500); 
        setTimeout (() =>{
          LoadingVideo.classList.add('hidden');     // ausblenden (per CSS Transition)
          loader.pause();
        }, 4500);
        setTimeout(() => {   
          LoadingVideo.style.display = 'none';
          loader.style.display = 'none';}, 5500)
    };