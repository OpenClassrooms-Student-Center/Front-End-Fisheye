import hydratePresentationFactory from "../factories/photographerPage.js";
import getSelectedSort from "../functions/getSelectedSort.js";
import hydratePhotoFactory from "../factories/photo.js";

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
            
            const photos = data.media.filter((photo)=> photo.photographerId === parseInt(photographerId, 10))
            const name = data.photographers.filter((photographer) => photographer.id === parseInt(photographerId, 10))
            return [photos, name[0].name]
        })
        .then(data => {
            const photosId = data[0]
            const name = data[1]
            const sortMedia = getSelectedSort(photosId, name);
            sortMedia.forEach((photo) => {
                hydratePhotoFactory(photo, sortMedia, name)
            })
            
        })
}

initPhotographe ()
