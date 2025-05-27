/**
 * @class PhotographeData
 * @classdesc Cette classe permet de créer un objet PhotographeData
 * @param {Object} data - Données du photographe
 * @export {PhotographeData}
 */
export default class PhotographeData {
    constructor(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid card data provided');
        }
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = this.formatPortraitPath(data.portrait);
    }
    //fonction de récupération du chemin de l'image
    /**
     * @description - Récupère le chemin de l'image
     * @param {*} portrait 
     * @returns 
     */
    formatPortraitPath(portrait) { 
        return `./assets/images/FishEye_Photos/Sample_Photos/Photographers_ID_Photos/${portrait}`;
    }   
}

