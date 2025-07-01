// === Burger Menu Animationen
export function initMenuToggle() { // setzt korrekte Größe des Menüs
  const burgerMenu = document.getElementById('burger-menu');
  const menu        = document.getElementById('menu');
    console.log('öffnen');

  const items       = menu.querySelectorAll('a');
      burgerMenu.addEventListener('click', () => {
    // erst die Delay-Variable für jeden Link setzen
        if (
            !burgerMenu.classList.contains('active') ||
            !menu.classList.contains('active')
            ) {
            items.forEach((item, i) => {
            item.style.setProperty('--delay', `${i * 0.1}s`);
            });
            // dann nur noch die offene Klasse toggeln
            burgerMenu.classList.toggle('active');
            menu.classList.toggle('active');
            console.log('öffnen');
        } else if (
            burgerMenu.classList.contains('active') &&
            menu.classList.contains('active')
        ) {
            const itemCount = items.length;
            console.log(itemCount);
            items.forEach((item, i) => {
                const negItemCount = itemCount - 1 - i;
                item.style.setProperty('--delay', `${negItemCount * 0.1}s`);
            });
            // dann nur noch die offene Klasse toggeln
            burgerMenu.classList.toggle('active');
            menu.classList.toggle('active');
            console.log('öffnen');
        } else {
            // sonstiger, unerwarteter Zustand
            console.error('Fehler: unerwarteter Menü-Zustand!');
        }
    })
}
