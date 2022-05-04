import getSelectedSort from "../functions/getSelectedSort.js";
import hydratePhotoFactory from "../factories/photo.js";
import sliderFactory from "../factories/slider.js";
import createPhotoCard from "../templates/Card.js";
import Presentation from "../model/presentation.js"

import presentationTemplate from "../templates/presentationTemplate.js";

async function initPhotographe() {
    const photographerId = getphotographerId();
    await getPresentation(photographerId);
    await getPhotos(photographerId)
}

function getphotographerId() {
    return new URL(location.href).searchParams.get("id")
}

async function getPresentation(photographerId) {
    fetch("../data/photographers.json")
        .then(res => res.json())
        .then(data => {
            return data.photographers.filter((photographe)=> photographe.id === parseInt(photographerId, 10))
        })
        .then(filtingphotographe => {
            const newPresentation = new Presentation(filtingphotographe[0])
            const section = document.createElement("section")
            section.innerHTML = presentationTemplate(newPresentation)
            document.querySelector(".presentation__section").appendChild(section)
            section.className = "photograph-header"

            
        })
}
async function getPhotos(photographerId) {
    fetch("../data/photographers.json")
        .then(res => res.json())
        .then(data => {
            const dataMedias = data.media.filter((photo)=> photo.photographerId === parseInt(photographerId, 10))
            const name = data.photographers.filter((photographer) => photographer.id === parseInt(photographerId, 10))
            const medias = dataMedias.map(media => hydratePhotoFactory(media, name))
            
            return [medias, name[0].name]
        })
        .then(data => {
            const photosId = data[0]
            const name = data[1]
            const sortMedia = getSelectedSort(photosId);
    
            const container = document.querySelector(".photo-field")
            sortMedia.forEach((media) => {
                const card = document.createElement("article")
                card.classList.add("cardMedia")
                card.innerHTML = createPhotoCard(media, name)
                const cardMedia = container.appendChild(card)

                const elt = cardMedia.querySelector(".photo")
                elt.addEventListener("click", () => sliderFactory(media, sortMedia, name))

                const like = cardMedia.querySelector(".photo__likes")
                like.addEventListener("click",(e) => media.toggleLike(e) )
            })
            
        })

}


initPhotographe ()
