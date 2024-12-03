import imagesData from "../constructorPattern/imagesData";
import videosData from "../constructorPattern/videosData";


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