// Créer un article contenant les informations de chaque photographe
function createMediaFactory(data) {
    console.log(data)

    function getMediaDOM() {
        let mediaHtml = "";
        for (let i = 0; i < data.length; i++) {
            const { id, title, likes, image, video } = data[i];
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
                    ${media.getDom()}
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
        console.log(figure.querySelectorAll(`#like-${id}`))
        return figure.children;
    }

    return { getMediaDOM }
}

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
                src="assets/medias/${this.src}" 
                alt="${this.title}" 
                class="media-figure-img" 
                aria-label="Photo nommée ${this.title}, cliquez ou appuyez sur entrée pour agrandir" 
                tabindex=0
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
                src="assets/medias/${this.src}" 
                class="media-figure-img"
                aria-label="Vidéo nommée ${this.title}, cliquez ou appuyez sur entrée pour agrandir" 
                tabindex=0
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

const incrementLikes = (id, likes) => {
    let mediaLikes = likes;
    let mediaLiked = mediaLikes += 1;

    // Mettre à jour le nombre de likes et l'icône
    const likeBtn = document.getElementById(`like-${id}`);
    if (!likeBtn.classList.contains('dislike')) {
        mediaLikes += 1
        likeBtn.classList.add('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-solid fa-heart"></i>`;
        likeBtn.ariaLabel = `Retirer votre like de l'image : ${title}"`
    } else {
        mediaLiked -= 1;
        likeBtn.classList.remove('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-regular fa-heart"></i>`;
        likeBtn.ariaLabel = `Ajouter un like à l'image : ${title}"`
    }
}