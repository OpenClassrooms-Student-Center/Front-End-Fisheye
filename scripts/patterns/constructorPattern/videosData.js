import MediaData from "./mediaData.js";
/**
 * @class VideosData
 * @description - Crée une nouvelle instance de la  classe VideosData
 * @param {Object} data - Données des vidéos
 * @extends MediaData
 * @export {VideosData}
 * 
 */
export default class VideosData extends MediaData {
    constructor(data) {
        super(data);
        this._video = data.video;
    }
}