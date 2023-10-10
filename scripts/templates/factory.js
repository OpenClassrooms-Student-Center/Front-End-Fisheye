///// Factory function for medias 

class Media {
    #media;
    #photographer;
    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    getMediaCardDom() {
        if (this.#media.video){
            new Video (this.#media, this.#photographer).getMediaCardDom();
        }else {
            new Image (this.#media, this.#photographer).getMediaCardDom();
        }
    }
}

class Image {
    #media;
    #photographer;
    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    imageMediaTemplate() {

        const { photographerId, title, image, likes } = this.#media;
        const imageMedia = `assets/medias/` + `${photographerId}` + `/` + `${image}`;
        const likeIconMedia = `assets/icons/like-icon.png`

        const article = document.createElement('article');
    
        const imageElement = document.createElement('img');
        imageElement.setAttribute("src", imageMedia);
        imageElement.setAttribute("alt", title);
    
    
        const divDescription = document.createElement('div');
    
        const titleElement = document.createElement('h2');
        titleElement.innerText = title;
    
        const likesElement = document.createElement('p');
        likesElement.innerText = likes;
    
        const likesIcon = document.createElement('img')
        likesIcon.setAttribute("src", likeIconMedia);
        likesIcon.setAttribute("alt", "j'aimes");
    
        article.appendChild(imageElement);
        article.appendChild(divDescription);
        divDescription.appendChild(titleElement);
        divDescription.appendChild(likesElement);
        divDescription.appendChild(likesIcon);
    
        return article;
        
    }

    getMediaCardDom(){
        const sectionMedia = document.querySelector(".media");
        const mediaModel = this.imageMediaTemplate();
        sectionMedia.appendChild(mediaModel);
    }

}

class Video {
    #media;
    #photographer;
    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    videoMediaTemplate() {

        const { photographerId, title, video, likes } = this.#media;
        const videoMedia = `assets/medias/` + `${photographerId}` + `/` + `${video}`;
        const likeIconMedia = `assets/icons/like-icon.png`

        const article = document.createElement('article');

        const videoDiv = document.createElement('video');

        const videoElement = document.createElement('source');
        videoElement.setAttribute("src", videoMedia);
        videoElement.setAttribute("type", "video/mp4");
        //Voir accessibilité vidéos et attribut control


        const divDescription = document.createElement('div');

        const titleElement = document.createElement('h2');
        titleElement.innerText = title;

        const likesElement = document.createElement('p');
        likesElement.innerText = likes;

        const likesIcon = document.createElement('img')
        likesIcon.setAttribute("src", likeIconMedia);
        likesIcon.setAttribute("alt", "j'aimes");

        article.appendChild(videoDiv);
        videoDiv.appendChild(videoElement);
        article.appendChild(divDescription);
        divDescription.appendChild(titleElement);
        divDescription.appendChild(likesElement);
        divDescription.appendChild(likesIcon);

        return article;
    }

    getMediaCardDom() {
        const sectionMedia = document.querySelector(".media");
        const mediaModel = this.videoMediaTemplate();
        sectionMedia.appendChild(mediaModel);
    }


}
