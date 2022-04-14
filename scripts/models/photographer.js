//Mettre le code JavaScript lié à la page photographer.html

class Photographers{
    constructor(data) {
        this._name = data.name
        this._portrait = data.portrait
        this._city = data.city
        this._country = data.country
        this._price = data.price
        this._tagline = data.tagline
        this._id = data.id
    }

    get name(){
        return this._name
    }

    get portrait(){
        return `/assets/photographers/${this._portrait}`
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