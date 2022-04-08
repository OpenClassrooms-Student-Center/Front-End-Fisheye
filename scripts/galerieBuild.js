import GalleryFactory from "./factories/media.js";
import likeEvent from "./Likes.js";
import BoxLikes from "./boxlikes.js";
export default class GaleryBuilder {
    constructor() {
        this.totalLike = 0;
    }
    photographersMedias(data) {
        const medias = data.dataMedias;
        // Appel de la méthode de GalleryFactory pour créer la gallerie
        const GALLERY = new GalleryFactory().builderGallery(medias);
        new BoxLikes().boxLikesAndPrice(GALLERY.totalLike, data.dataPhotographers);
        new likeEvent();
    }
    
       
}