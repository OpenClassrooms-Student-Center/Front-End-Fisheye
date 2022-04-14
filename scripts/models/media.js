class PhotographersMedia{
    constructor(media){
        this._title = media._title
        this._photographerId = media._photographerId
        this._likes = media._likes
        this._image = media._image
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
}