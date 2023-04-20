class PhotographerMedia {
    constructor(media) {
        // this._media = media
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
        this._video = media.video
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
        this._id = media.id
    }
    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    //j'ajoute un setter pour pouvoir modifier le nombre de likes
    set likes(newLikes) {
        this._likes = newLikes
    }
    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }

    get image() {
        return this._image
    }

    get video() {
        return this._video
    }

    get id() {
        return this._id
    }
}