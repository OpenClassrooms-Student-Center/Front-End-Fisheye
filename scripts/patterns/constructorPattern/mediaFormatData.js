export default class mediaFormatData {
    constructor(data){
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid media data provided');
        }
            this._id = data.id;
            this._photographerId = data.photographerId;
            this._title = data.title;
            this._likes = data.likes;
            this._date = data.date;           
            this._price = data.price; 
    }
    
}