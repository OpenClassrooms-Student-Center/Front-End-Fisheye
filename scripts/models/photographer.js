// CONSTRUCTOR PATTERN

class Photographer {
    constructor(name, id, city, country, tagline, price, portrait) {
        this._name = name;
        this._id = id;
        this._city = city;
        this._country = country;
        this._tagline = tagline;
        this._price = price;
        this._portrait = portrait;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get city() {
        return this._city;
    }

    get country() {
        return this._country;
    }

    get tagline() {
        return this._tagline;
    }

    get price() {
        return this._price;
    }

    get portrait() {
        return `assets/photographers/${this._portrait}`;
    }
}