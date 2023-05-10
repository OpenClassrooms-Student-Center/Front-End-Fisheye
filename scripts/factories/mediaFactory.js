// Créer un article contenant les informations de chaque photographe
function mediaFactory(data) {
    function getMediaDOM() {
        let mediaHtml = "";
        for (let i = 0; i < data.length; i++) {
            const { title, image, video, likes } = data[i];
            let mediaSrc;
            let tagHTML;

            if (image) {
                mediaSrc = `assets/medias/${image}`;
                tagHTML = 'img';
            } else {
                mediaSrc = `assets/medias/${video}`;
                tagHTML = 'iframe'
            }

            mediaHtml += `
                <figure class="media-figure">
                    <${tagHTML}
                        src="${mediaSrc}" 
                        alt="${title}" 
                        class="media-figure-img"
                    >
                    <figcaption class="media-figure-figcaption">
                        <h2 class="media-figure-figcaption-title">${title}</h2>
                        <p class="media-figure-figcaption-like">${likes} Likes</p>
                    </figcaption>
                </figure>
            `;
        }
        
        const figure = document.createElement('figure');
        figure.innerHTML = mediaHtml;
        return figure.children;
    }

    return { getMediaDOM }
}