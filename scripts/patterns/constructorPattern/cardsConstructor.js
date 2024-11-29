export class CardConstructor {
    constructor(data){
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid card data provided');
          }
        this._id = data.id;
        this._portrait = data.portrait;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
    }
    
}