// === DOM-Element = HTML Element (z.B. <div> oder <p>)
// === querySelector() = Auswahl eines DOM-Elements
// === Diese Elemente sind dynamisch – sie hängen vom DOM ab und könnten bei Änderungen im HTML angepasst werden müssen.

// == Einbindungen der relevanten HTML-Elemente in JS
export const burgerMenu = document.querySelector('.burger-menu');
export const menu = document.querySelector('.menu');
export const header = document.querySelector('.header');
export const sections = document.querySelectorAll('.section');
export const videos = document.querySelectorAll('.background-video');

export const videoPopup = document.querySelector('.video-player-popup');
export const videoContainer = document.querySelector('.video-player-container');
export const popupVideo = document.querySelector('.popup-video');
export const closeVideo = document.querySelector('.close-video');
export const thumbnails = document.querySelectorAll('.thumbnail');
export const descriptionBox = document.querySelector('.video-description-box');

// === ID for
export const headerID = document.getElementById('header');
export const menuID = document.getElementById('menu');
export const burgerMenuContainerID = document.getElementById('burger-menu-container');
export const MainContainerID = document.getElementById('main-container');
export const ContentContainerID = document.getElementById('content-container');
export const LoadingVideo = document.getElementById('loading-video-container');
export const loader = document.getElementById('loading-video');
export const pageWrapper = document.getElementById('page-wrapper');
export const videoContainerID = document.getElementById('.video-player-container');

// ===== Debugging:
document.addEventListener('DOMContentLoaded', () => {
    console.log('domRefs.js loaded');
});