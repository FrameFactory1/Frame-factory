import { isMobile } from '../utils/constants.js';
import { initVideoPopupMobile } from './videoPopup.mobile.js';
import { initVideoPopupDesktop } from './videoPopup.desktop.js';

export function initVideoPopup() {
    if (isMobile()) {
        initVideoPopupMobile();
                // ===== Debugging:
                console.log('videoPopupMobile.js should be loaded');
    } else {
        initVideoPopupDesktop();
                // ===== Debugging:
                console.log('videoPopupDesktop.js should be loaded');
    }
}
