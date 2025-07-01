// === Für logische, feste Werte, die nichts mit dem DOM zu tun haben.

export const ANIM_SHORT = 300; // Zeit in ms für kurze Animationen
export const ANIM_MEDIUM = 600; // Zeit in ms für mittellange Animationen z.B. komplexe Übergäng
export const minSwipeDistance = 50; // Mindest-Swipe-Distanz in Pixeln, ab der ein Wisch auf Mobilgeräten als „gültig“ zählt
export const isMobile = () => window.innerWidth <= 768; // Hilfsfunktion, die Fensterbreite prüft um Mobilgeräte zu erkennen

// ===== Debugging:
document.addEventListener('DOMContentLoaded', () => {
    console.log('constants.js loaded');
});