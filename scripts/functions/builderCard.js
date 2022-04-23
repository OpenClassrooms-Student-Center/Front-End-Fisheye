import hydratePhotoFactory from "../factories/photo.js";
import sliderFactory from "../factories/slider.js";

export default function builderCard(sortMedia, name){
    const container = document.querySelector(".photo-field")
    sortMedia.forEach((media) => {
            const cardContent= hydratePhotoFactory(media, sortMedia, name)
            // let card = document.createElement("article")
            // console.log(card)
            // container.appendChild(card);
            // card.innerHTML += cardContent
            // const img = card.querySelector(".photo");
            // img.addEventListener("click", () => sliderFactory(media, sortMedia, name))
            
            // media.addEventListener("click", () => sliderFactory(media, sortMedia, name))
        })
    
}