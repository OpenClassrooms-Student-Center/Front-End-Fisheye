import imagesData from "../constructorPattern/imagesData.js";
import videosData from "../constructorPattern/videosData.js";

/**
 * @class MediasFactory
 * @param {Object} data - Données des médias
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