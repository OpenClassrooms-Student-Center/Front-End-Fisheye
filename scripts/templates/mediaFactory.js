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
    #photographer
    constructor(media, photographer) {
        this.#media = media;
        this.#photographer = photographer;
    }

    imageMediaTemplate() {

        const {photographerId, image} = this.#media;
        const pId = photographerId;
        let photographerName;
    
        switch (pId) {
            case '243' :
                photographerName = "Mimi";
                break;
            case '930' :
                photographerName = "Ellie Rose";
                break;
            case '82' :
                photographerName = "Tracy";
                break;
            case '527' :
                photographerName = "Nabeel";
                break;
            case '925' :
                photographerName = "Rhode";
                break;
            case '195' :
                photographerName = "Marcel";
                break;
            default:
                alert('photographer missing')
        }

        const imageMedia = `assets/medias/${pId}/${image}`;

        const imageElement = document.createElement('img');
        imageElement.setAttribute("src", imageMedia);
        imageElement.setAttribute("alt", title);
    
        article.appendChild(imageElement);
        
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

        const { photographerId,video} = this.#media;
        const pId = photographerId;
        let photographerName;
    
        switch (pId) {
            case '243' :
                photographerName = "Mimi";
                break;
            case '930' :
                photographerName = "Ellie Rose";
                break;
            case '82' :
                photographerName = "Tracy";
                break;
            case '527' :
                photographerName = "Nabeel";
                break;
            case '925' :
                photographerName = "Rhode";
                break;
            case '195' :
                photographerName = "Marcel";
                break;
            default:
                alert('photographer missing')
        }
        const videoMedia = `assets/medias/${pId}/${video}`;

        const videoDiv = document.createElement('video');

        const videoElement = document.createElement('source');
        videoElement.setAttribute("src", videoMedia);
        videoElement.setAttribute("type", "video/mp4");
        //Voir accessibilité vidéos et attribut control

        article.appendChild(videoDiv);
        videoDiv.appendChild(videoElement);

        return article;
    }

    getMediaCardDom() {
        const sectionMedia = document.querySelector(".media");
        const mediaModel = this.videoMediaTemplate();
        sectionMedia.appendChild(mediaModel);
    }


}
