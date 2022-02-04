class MediaFactory {
    constructor(photographer, index, media, slideshow) {
        if (media.image) {
            return this.getPhotoDOM(photographer, slideshow, index, media)
        } else if (media.video) {
            return this.getVideoDOM(photographer, slideshow, index, media)
        } else {
            return
        }
    }

    /**
     * Retourne l'element DOM d'une vidéo
     * @param {object} photographer 
     * @param {object} slideshow 
     * @param {number} index 
     * @param {object} video 
     * @returns 
     */
    getVideoDOM(photographer, slideshow, index, video) {

        const videoLink = `assets/images/${photographer.name}/${video.video}`;
        const iconImage = `assets/icons/Vector.png`;

        const article = document.createElement('article');
        const link = document.createElement('a');
        const videoElement = document.createElement('video');
        const srcVideo = document.createElement('source');

        videoElement.appendChild(srcVideo);
        videoElement.setAttribute('width', 350);
        videoElement.setAttribute('height', 300);

        videoElement.addEventListener("click", function () {
            slideshow.open(index)

        }, true);
        srcVideo.setAttribute('src', videoLink);

        const titleDiv = document.createElement('div');

        const title = document.createElement('h3');
        title.textContent = video.title;

        const span = document.createElement('span');
        span.textContent = video.likes;

        const icon = document.createElement('img');
        icon.setAttribute("src", iconImage);
        icon.setAttribute("alt", "likes")
        span.appendChild(icon);

        article.appendChild(link);

        link.appendChild(videoElement);
        titleDiv.appendChild(title)
        article.appendChild(titleDiv);
        title.appendChild(span);

        return (article);

    }

    /**
     * Retourne l'element DOM d'une photo
     * @param {object} photographer 
     * @param {number} index 
     * @param {object} photo 
     * @param {object} slideshow 
     * @returns 
     */
    getPhotoDOM(photographer, slideshow, index, photo) {
        const photoLink = `assets/images/${photographer.name}/${photo.image ? photo.image : photo.video}`;
        const likeIcon = `assets/icons/Vector.png`;
        const article = document.createElement('article');
        const link = document.createElement('a');

        const img = document.createElement('img');
        link.addEventListener("click", function () {
            slideshow.open(index)

        }, true);

        const titleDiv = document.createElement('div');

        const title = document.createElement('h3');
        title.textContent = photo.title;

        const span = document.createElement('span');
        span.textContent = photo.likes;

        const icon = document.createElement('img');
        icon.setAttribute("src", likeIcon);
        icon.setAttribute("alt", "likes")
        span.appendChild(icon);

        img.setAttribute("src", photoLink)
        img.setAttribute("alt", photo.title)
        img.setAttribute("aria-pressed", false)
        img.setAttribute("role", "button")
        link.setAttribute("href", "#")
        link.setAttribute("title", "Agrandir l'image")
        article.appendChild(link);

        link.appendChild(img);
        titleDiv.appendChild(title)
        article.appendChild(titleDiv);
        title.appendChild(span);

        return (article);
    }

}
