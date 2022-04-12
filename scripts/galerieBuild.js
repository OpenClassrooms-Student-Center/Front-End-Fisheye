import GalleryFactory from "./factories/media.js";
import likeEvent from "./Likes.js";
import BoxLikes from "./boxlikes.js";
export default class GaleryBuilder {
    constructor() {
        this.totalPhLike = 0;
    }
    photographersMedias(data) {
        const medias = data.dataMedias;
        //mode de triage 'popularite' par defaut lors de l'affichage galerie
        medias.sort((a, b) => {
            return b.likes - a.likes;
        })
        // Appel de la méthode de GalleryFactory pour créer la gallerie
        const GALLERY = new GalleryFactory().builderGallery(medias);
        new BoxLikes().boxLikesAndPrice(GALLERY.totalPhLike, data.dataPhotographers);
        new likeEvent();
    }
    
       
}