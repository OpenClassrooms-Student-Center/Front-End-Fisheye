//Mettre le code JavaScript lié à la page photographer.html

class Photographers{
    constructor(photographer) {
        this._name = photographer.name
        this._portrait = photographer.portrait
        this._city = photographer.city
        this._country = photographer.country
        this._price = photographer.price
        this._tagline = photographer.tagline
        this._id = photographer.id
    }

    get name(){
        return this._name
    }

    get portrait(){
        return `${this._portrait}`
    }

    get price(){
        return this._price
    }

    get tagline(){
        return this._tagline
    }

    get city(){
        return this._city
    }

    get country(){
        return this._country
    }

    get id(){
        return this._id
    }
}