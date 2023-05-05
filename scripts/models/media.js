class Media {
    constructor(data){
        this._id = data.id
		this._photographerId = data.photographerId
		this._title = data.title
		this._image = data.image
		this._likes = data.likes
		this._date = data.date
		this._price = data.price
        this._video = data.video
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get image() {
        return this._image
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
    get video() {
        return this._video
    }

}
