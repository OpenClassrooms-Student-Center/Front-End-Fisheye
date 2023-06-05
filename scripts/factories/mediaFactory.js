// Pattern pour créer automatiquement une image ou une vidéo
class Media {
    constructor({ id, title, likes, src }) {
        this.id = id;
        this.likes = likes;
        this.title = title;
        this.src = src;
    }
    
    getDom() {}
}

class Image extends Media {
    constructor({ id, title, likes, image }) {
        super({ id, title, likes, src: image });
    }
    
    getDom() {
        return `
            <img
                id="img-${this.id}" 
                src="assets/medias/${this.src}" 
                alt="${this.title}" 
                class="media-figure-img"
                aria-label="Photo nommée ${this.title}" 
            >
        `;
    }
}

class Video extends Media {
    constructor({ id, title, likes, video }) {
        super({ id, title, likes, src: video });
    }

    getDom() {
        return `
            <video
                id="img-${this.id}"
                src="assets/medias/${this.src}"
                alt="${this.title}" 
                class="media-figure-img"
                aria-label="Vidéo nommée ${this.title}" 
                controls
            ></video>
        `;
    }
}

/**
 * 
 * @param type
 * @return {Media}
 */

const factory = (type, options) => {
    if (type === 'image') return new Image(options);
    if (type === 'video') return new Video(options);
    throw new Error('Invalid media type');
};

// Créer une figure contenant un média de photographe
function createMediaFactory(mediasData, sortBy = 'popularity') {
    function sortMedia(a, b) {
        if (sortBy === 'popularity') {
            return b.likes - a.likes;
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'date') {
            return new Date(b.date) - new Date(a.date);
        }
    }

    function getMediaDOM() {
        const sortedMediasData = mediasData.sort(sortMedia);

        let mediaHtml = "";
        for (let i = 0; i < sortedMediasData.length; i++) {
            const { id, title, likes, image, video } = sortedMediasData[i];
            let media;

            if (image) {
                media = factory('image', { id, title, likes, image });
            } else if (video) {
                media = factory('video', { id, title, likes, video });
            } else {
                throw new Error('Invalid media object: missing image or video field');
            }

            mediaHtml += `
                <figure class="media-figure">
                    <div
                        id="media-${id}"
                        class="media-item"
                        tabindex="0"
                        aria-hidden=false
                        aria-label="Cliquez ou appuyez sur 'Enter' pour ouvrir le média. Vous pouvez naviguer entre les médias avec les flèches du clavier et quitter à tout moment avec la touche 'Echap'."
                    >
                        ${media.getDom()}
                    </div>
                    <figcaption class="media-figure-figcaption">
                        <h2 class="media-figure-figcaption-title">${title}</h2>
                        <button 
                            id="like-${id}" 
                            class="media-figure-figcaption-btn"
                            aria-label="Ajouter un like au media : ${title}">
                                <span class="nbr-likes">${likes}</span> <i class="fa-regular fa-heart like-icon"></i>
                        </button>
                    </figcaption>
                </figure>
                <div 
                    id="media-modal-${id}" 
                    class="media-modal" 
                    aria-hidden=true tabindex=-1
                >
                    <span 
                        class="element-light-box element-light-box-cross"
                        aria-label="Fermer le média"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                    <span 
                        class="element-light-box element-light-box-arrowLeft"
                        aria-label="Média suivant"
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </span>
                    <span 
                        class="element-light-box element-light-box-arrowRight"
                        aria-label="Média précédent"
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                    <p class="element-light-box element-light-box-title">${title}</p>
                    ${media.getDom()}
                </div>
            `;
        }

        const figure = document.createElement('figure');
        figure.innerHTML = mediaHtml;
        return figure.children;
    }

    return { getMediaDOM }
}