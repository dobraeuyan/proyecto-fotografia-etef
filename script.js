// Script para scroll suave
document.addEventListener('DOMContentLoaded', function() {  // <--- AÑADE ESTO
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

    // Cargar configuración y generar tarjetas
    const destacadosGrid = document.querySelector('.destacados-grid');

    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            config.destacados.forEach(item => {
                const article = document.createElement('article');
                article.classList.add('mdc-card');

                const link = document.createElement('a');
                link.href = '#';  //  Pon un enlace real si es necesario
                link.classList.add('mdc-card__primary-action');
                link.tabIndex = 0;

                const mediaDiv = document.createElement('div');
                mediaDiv.classList.add('mdc-card__media'); // <-- ELIMINA , 'mdc-card__media--16-9'
                mediaDiv.style.position = 'relative'; // Añadido para el pseudo-elemento
                
                // Crear el pseudo-elemento para el aspect ratio
                const aspectRatioDiv = document.createElement('div');
                aspectRatioDiv.style.paddingTop = '56.25%'; // 16:9 aspect ratio
                mediaDiv.appendChild(aspectRatioDiv);


                const img = document.createElement('img');
                img.src = `images/${item.image}`;
                img.alt = item.title;
                img.loading = 'lazy';
                img.decoding = 'async';
                img.width = 800;  // Pon un tamaño base, o calcula si tienes dimensiones
                img.height = 450;
                img.classList.add('mdc-card__media-content');
                img.style.position = 'absolute'; // Añadido para el pseudo-elemento
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover'; // Asegura que la imagen cubra


                mediaDiv.appendChild(img);
                link.appendChild(mediaDiv);

                const contentDiv = document.createElement('div');
                contentDiv.classList.add('mdc-card__content');

                const title = document.createElement('h3');
                title.classList.add('mdc-card__title');
                title.textContent = item.title;

                const description = document.createElement('p');
                description.classList.add('mdc-card__description');
                description.textContent = item.description;

                contentDiv.appendChild(title);
                contentDiv.appendChild(description);
                link.appendChild(contentDiv);
                article.appendChild(link);
                destacadosGrid.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading config:', error));
}); // <--- Y ESTO
