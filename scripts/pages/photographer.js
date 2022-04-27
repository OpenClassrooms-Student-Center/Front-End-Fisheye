import hydratePresentationFactory from "../factories/photographerPage.js";
import getSelectedSort from "../functions/getSelectedSort.js";
import hydratePhotoFactory from "../factories/photo.js";
import sliderFactory from "../factories/slider.js";
import createPhotoCard from "../templates/Card.js";

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
          
            hydratePresentationFactory(filtingphotographe[0])
            return (filtingphotographe[0].name)
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
                const elt = container.appendChild(card)
                
                elt.addEventListener("click", () => sliderFactory(media, sortMedia, name))
            })
            
        })

}


initPhotographe ()
