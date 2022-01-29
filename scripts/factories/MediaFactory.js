class MediaFactory {
    constructor(photographer, index, media, photos) {
        if (media.image) {
            return this.getPhotoDOM(photographer, index, media, photos)
        } else if (media.video) {
            return this.getVideoDOM(photographer, photos, index, media)
        } else {
            return
        }
    }


    getVideoDOM(photographer, photos, index, video) {

        const videoLink = `assets/images/${photographer.name}/${video.video}`;
        const iconImage = `assets/icons/Vector.png`;

        const article = document.createElement('article');
        const link = document.createElement('a');
        const videoElement = document.createElement('video');
        const srcVideo = document.createElement('source');

        videoElement.appendChild(srcVideo);
        videoElement.setAttribute('width', 350);
        videoElement.setAttribute('height', 300);

        let slideshow = new SlideShow(photographer.name, photos);
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

    getPhotoDOM(photographer, index, photo, photos) {
        const photoLink = `assets/images/${photographer.name}/${photo.image ? photo.image : photo.video}`;
        const likeIcon = `assets/icons/Vector.png`;
        const article = document.createElement('article');
        const link = document.createElement('a');

        const img = document.createElement('img');
        var slideshow = new SlideShow(photographer.name, photos);
        link.addEventListener("click", function () {
            slideshow.open(index, photos)

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
