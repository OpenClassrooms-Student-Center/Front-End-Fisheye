import { ApiJson } from "../services/Api.js"
import photographerFactory from "../factories/photographer.js"
import MediaFactory from "../factories/media.js"

function getPhotographerId() {

    const paramsURL = (new URL(document.location)).searchParams,
        id = paramsURL.get('id')

    return id
}

async function getPhotographerData() {

    const id = parseInt(getPhotographerId())

    let data 
    try {
        const fetchingURL = '../../data/photographers.json'; 
        data  = await ApiJson(fetchingURL)
    } catch(err) {
        console.log(`Error while trying to get photographers: ${err}`)
        throw new Error()
    }

    const { photographers, media } = data,
        photographer = photographers.filter(item => item.id === id)[0],
        photographerMedias = media.filter(item => item.photographerId === id)

    return { photographer, photographerMedias}
}

async function displayPhotographerInformation(photographer) {

    const photographerModel = photographerFactory(photographer);

    const { photographerPresentationElement, photographerPictureElement } = photographerModel.getUserCardDOM(true)

    const photographerHeader = document.querySelector('.photograph-header')

    const contactButton = document.querySelector('.contact_button')

    photographerHeader.append(photographerPresentationElement, contactButton, photographerPictureElement)

}


function displayMedia(photographerName, media) {

    const mediaModel = MediaFactory(photographerName, media)
    
    const mediaElement = mediaModel.getUserMediaDOM()

    const galleryElement = document.querySelector('.gallery')

    galleryElement.appendChild(mediaElement)
}


function displayMedias(photographerName, photographerMedias) {
    photographerMedias.forEach(media => {
        displayMedia(photographerName, media)
    })
}

async function init() {
    // Récupère les datas des photographes
    const { photographer, photographerMedias } = await getPhotographerData();
    displayPhotographerInformation(photographer);
    displayMedias(photographer.name, photographerMedias)
};

init();
