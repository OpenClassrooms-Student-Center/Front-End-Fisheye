class PhotographerMedia{
    constructor(media){
        this._media = media
    }

    createPhotographerMedia(){
        const $wrapperMedia = document.createElement('div')
        // $wrapperMedia.classList.add('photographer-profile-wrapper')

        const photographerMedia = `
        <div>
            <h1>${this._media.title}</h1>
            <h2>${this._media.photographerId}, ${this._photographer.country}
            <p>${this._media.likes}<p>
        </div>
        
        `
        $wrapperMedia.innerHTML = photographerMedia
        return $wrapperMedia
    }
}