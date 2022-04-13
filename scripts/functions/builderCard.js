import hydratePhotoFactory from "../factories/photo.js";

export default function builderCard(sortMedia, name){
    sortMedia.forEach((media) => {
            hydratePhotoFactory(media, sortMedia, name)
            // media.addEventListener("click", () => sliderFactory(media, sortMedia, name))
        })
    
}