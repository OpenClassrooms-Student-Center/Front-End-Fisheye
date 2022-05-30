class PhotographerMedia{
    constructor(media){
        this._media = media
    }

    createPhotographerMedia(){
        const $wrapperMedia = document.createElement('article')
        $wrapperMedia.classList.add('mediaCard')
        // $wrapperMedia.classList.add('photographer-profile-wrapper')

        const photographerMedia = `
        
            <a href=/assets/photographersMedias/${this._media.image || this._media.video}><img class="photographerMedia" alt="Image - ${this._media.title}" src="/assets/photographersMedias/${this._media.image || this._media.video}"/></a>
            <div class="media_infos">
            <p>${this._media.title}</p>
            <p id="likeNmbr">${this._media.likes}<button id="btnLike"><i class="fa-solid fa-heart"></i></button></p>
            </div>
            
        
            
        `
        $wrapperMedia.innerHTML = photographerMedia
        return $wrapperMedia
    }

//add up all media.likes

    static getTotalLikes(){
        const totalLikes = document.querySelectorAll('#likeNmbr')
        let sum = 0
        totalLikes.forEach(like => {
            sum += parseInt(like.innerHTML)
        })
        return sum
       
    }
   


    


}