import imagesData from "../constructorPattern/imagesData.js";
import videosData from "../constructorPattern/videosData.js";

/**
 * @description Cette classe permet de créer un média en fonction de son type
 * @class MediasFactory
 * @param {Object} data - Données des médias
 * @returns {Object} - Retourne un média
 */
export default class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new imagesData(data)
        } else if (data.video) {
            return new videosData(data)
        } else {
            throw 'Unknown data type'
        }
    }
}