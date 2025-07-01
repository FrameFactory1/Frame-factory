import { sections } from '../init/domRefs.js';

export function actualizePaddingTop() {
  const sectionPaddingTop = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height');
  sections.forEach(section => {
    section.style.paddingTop = sectionPaddingTop;
  });
}