class PhotographerMedia {
    constructor(media) {
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
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
        return `/assets/photographers/${Photographer(this._photographer._name)}/${this._image}`
    }

    get id() {
        return this._id
    }
}