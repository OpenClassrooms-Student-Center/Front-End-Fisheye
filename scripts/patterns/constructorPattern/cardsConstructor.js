export class cardConstructor {
    constructor(data){
        this._id = data.id;
        this._portrait = data.portrait;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
    }
    get id(){
        return this._id;
    }
    get portrait(){
        return `../../../assets/${this._portrait}`
    }
    get location(){
        return `${this._city} ${this._country}`;
    }
    get tagline(){
        return this._tagline;
    }
    get price(){
        return `${this._price}`;
    }
}