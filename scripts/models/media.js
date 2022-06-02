class PhotographersMedia{
    constructor(media){
        this._title = media._title
        this._photographerId = media._photographerId
        this._likes = media._likes
        this._image = media._image
        this._video = media._video
        this._date = media._date
    }
   
    get title(){
        return this._title
    }
    get photographerId(){
        return this._photographerId
    }
    get likes(){
        return this._likes
    }
    get video(){
        return this._video
    }
    get image(){
        return this._image
    }
    get date(){
        return this._date
    }
}