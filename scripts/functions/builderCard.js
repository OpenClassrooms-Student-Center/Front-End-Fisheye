import hydratePhotoFactory from "../factories/photo.js";
import sliderFactory from "../factories/slider.js";

export default function builderCard(sortMedia, name){
    sortMedia.forEach((media) => {
            hydratePhotoFactory(media, sortMedia, name)
            // media.addEventListener("click", () => sliderFactory(media, sortMedia, name))
        })
    
}