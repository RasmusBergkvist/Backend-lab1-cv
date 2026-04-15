"use strict";

document.addEventListener('DOMContentLoaded', () => {

    /* Mobilmeny */
    const menuButton = document.getElementById('mobile-menu');
    const menu = document.getElementById('menu');


    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active')

        const isOpen = menu.classList.contains('active');
        //*Ändrar symbol om beroende på om menyn är öppen eller stängd.
        if (isOpen) {
            menuButton.innerHTML = '✕';
            menuButton.setAttribute('aria-label', 'Stäng menyn');
        } else {
            menuButton.innerHTML = '&#9776;';
            menuButton.setAttribute('aria-label', 'Öppna menyn');
        }

    });
});
