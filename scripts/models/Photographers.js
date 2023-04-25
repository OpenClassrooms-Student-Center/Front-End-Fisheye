class Photographer {
    constructor(photographer) {
        this._name = photographer.name
        this._city = photographer.city
        this._country = photographer.country
        this._tagline = photographer.tagline
        this._price = photographer.price
        this._portrait = photographer.portrait
        this._id = photographer.id

    }

    get name() {
        return this._name
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return `/assets/photographers/portraitsPhotographers/${this._portrait}`
    }

}