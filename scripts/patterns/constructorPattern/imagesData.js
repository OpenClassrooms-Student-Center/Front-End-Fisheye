import MediaData from "./mediaData.js";
/**
 * @class ImagesData
 * @description - Crée une nouvelle instance de la  classe ImagesData
 * @param {Object} data - Données des images
 * @extends MediaData
 * @export {ImagesData}
 */
export default class ImagesData extends MediaData {
    constructor(data) {
        super(data);
        this._image = data.image;
    }
}