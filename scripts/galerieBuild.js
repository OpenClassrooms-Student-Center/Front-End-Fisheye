import GalleryFactory from "./factories/media.js";
export default class GaleryBuilder {
    photographersMedias(data) {
        const MEDIAS = data.dataMedias;
        // Appel de la méthode de GalleryFactory pour créer la gallerie
        const GALLERY = new GalleryFactory().builderGallery(MEDIAS);
    }
}