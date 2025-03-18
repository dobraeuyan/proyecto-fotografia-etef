// Script para scroll suave (sin cambios, funciona correctamente)
const scrollToContentButton = document.querySelector('.hero-scroll-button');
const contentSection = document.getElementById('destacados');

if (scrollToContentButton && contentSection) {
    scrollToContentButton.addEventListener('click', (event) => {
        event.preventDefault();
        contentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    });
}
