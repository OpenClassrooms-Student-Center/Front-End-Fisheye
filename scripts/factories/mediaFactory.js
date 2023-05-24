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
                aria-label="Photo nommée ${this.title}, cliquez ou appuyez sur entrée pour agrandir" 
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
            <iframe
                id="img-${this.id}"
                src="assets/medias/${this.src}" 
                class="media-figure-img"
                aria-label="Vidéo nommée ${this.title}, cliquez ou appuyez sur entrée pour agrandir" 
            ></iframe>
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
                    <div id="media-${id}" data-index="${i}" tabindex="0" onclick="launchLightBox(${id}, event, ${i})" onkeydown="launchLightBoxWithKey(${id}, event, ${i})" aria-label="Ouvrir le média">
                        <span 
                            class="element-light-box element-light-box-cross" 
                            onclick="launchLightBox(${id}, event)" 
                            aria-label="Fermer le média"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                        <span 
                            class="element-light-box element-light-box-arrowLeft" 
                            onclick="showPreviousMedia(event)" 
                            aria-label="Média suivant"
                        >
                            <i class="fa-solid fa-chevron-left"></i>
                        </span>
                        <span 
                            class="element-light-box element-light-box-arrowRight" 
                            onclick="showNextMedia(event)" 
                            aria-label="Média précédent"
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </span>
                        <p class="element-light-box element-light-box-title">${title}</p>
                        ${media.getDom()}
                    </div>

                    <figcaption class="media-figure-figcaption">
                        <h2 class="media-figure-figcaption-title">${title}</h2>
                        <button 
                            id="like-${id}" 
                            class="media-figure-figcaption-btn" 
                            onclick="incrementLikes(${id}, ${likes})"
                            aria-label="Ajouter un like à l'image : ${title}">
                                ${likes} <i class="fa-regular fa-heart"></i>
                        </button>
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

// Fonctions pour LightBox
const launchLightBox = (id, event, index) => {
    event.stopPropagation();

    const media = document.getElementById(`media-${id}`);
    const elmts = document.querySelectorAll('.element-light-box');

    if (!media.classList.contains('light-box')) {
        media.classList.add('light-box');
        elmts.forEach(elmt => elmt.style.display = 'block');
        currentIndex = index;
        media.addEventListener('keydown', lightBoxKeyDown);
    } else {
        media.classList.remove('light-box');
        elmts.forEach(elmt => elmt.style.display = 'none');
        media.removeEventListener('keydown', lightBoxKeyDown);
    }
}

const showNextMedia = (event) => {
    event.stopPropagation();

    const media = document.getElementsByClassName('media-figure');
    if (media.length > 0) {
        currentIndex = (currentIndex + 1) % media.length;
        showMediaAtIndex(currentIndex);
    }
}

const showPreviousMedia = (event) => {
    event.stopPropagation();
    
    const media = document.getElementsByClassName('media-figure');
    if (media.length > 0) {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        showMediaAtIndex(currentIndex);
    }
}

const showMediaAtIndex = (currentIndex) => {
    const media = document.getElementsByClassName('media-figure');

    const currentMedia = media[currentIndex];
    const currentElmt = currentMedia.querySelector('.media-figure > div');

    // Fermer toutes les autres light-box
    const lightBoxes = document.querySelectorAll('.light-box');
    lightBoxes.forEach(lightBox => {
        lightBox.classList.remove('light-box');
        const elements = lightBox.querySelectorAll('.element-light-box');
        elements.forEach(element => element.style.display = 'none');
    });

    // Ouvrir la light-box du média sélectionnée
    currentElmt.classList.add('light-box');
    const elements = currentElmt.querySelectorAll('.element-light-box');
    elements.forEach(element => element.style.display = 'block');
}

// Events clavier
const lightBoxKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
        showNextMedia(event);
    } else if (event.key === 'ArrowLeft') {
        showPreviousMedia(event);
    } else if (event.key === 'Escape') {
        const lightBox = document.querySelector('.light-box');
        if (lightBox) {
            const mediaId = lightBox.id.split('-')[1];
            launchLightBox(mediaId, event);
        }
    }
};

const launchLightBoxWithKey = (id, event, index) => {
    if (event.key === 'Enter') {
        launchLightBox(id, event, index);
    }
}

// Fonction d'incrémentation et décrémentation de Likes
const incrementLikes = (id, likes) => {
    let mediaLikes = likes;
    let mediaLiked = mediaLikes += 1;

    // Mettre à jour le nombre de likes et l'icône
    const likeBtn = document.getElementById(`like-${id}`);
    if (!likeBtn.classList.contains('dislike')) {
        mediaLikes += 1
        likeBtn.classList.add('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-solid fa-heart"></i>`;
        likeBtn.ariaLabel = `Retirer votre like de l'image"`
    } else {
        mediaLiked -= 1;
        likeBtn.classList.remove('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-regular fa-heart"></i>`;
        likeBtn.ariaLabel = `Ajouter un like à l'image"`
    }
}