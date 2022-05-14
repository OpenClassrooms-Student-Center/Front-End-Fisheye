class PhotographerMedia{
    constructor(media){
        this._media = media
    }

    createPhotographerMedia(){
        const $wrapperMedia = document.createElement('div')
        $wrapperMedia.classList.add('mediaCard')
        // $wrapperMedia.classList.add('photographer-profile-wrapper')

        const photographerMedia = `
        
            <img class="photographerMedia" src="/assets/photographersMedias/${this._media.image}"/>
            <div class="media_infos">
            <p>${this._media.title}</p>
            <p>${this._media.likes} <i class="fa-solid fa-heart"></i></p>
            </div>
            
        
        
        `
        $wrapperMedia.innerHTML = photographerMedia
        return $wrapperMedia
    }
}