import photoBuild from "../model/CardPhoto.js";
import videoBuild from "../model/CardVideo.js";

function hydratePhotoFactory(media, sortMedia, name) {
    
    if (media.image) {
        photoBuild(media, sortMedia, name)
    } else if (media.video) {
        videoBuild(media, sortMedia, name)
    }
    
}
export default hydratePhotoFactory