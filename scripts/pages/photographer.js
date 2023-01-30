import { ApiJson } from "../services/Api.js"
import photographerFactory from "../factories/photographer.js"
import MediaFactory from "../factories/media.js"
import { setupCarousel } from "../utils/carousel.js"
import { sortPortfolio } from "../utils/sort.js"

const galleryElement = document.querySelector('.gallery'),
    carouselItems = document.querySelector('.carousel__items'),
    mediasSortTypeDefault = 'popularity',
    filterButton = document.querySelector('#sort'),
    contactButton = document.querySelector('.contact_button')


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

    const [photographerPresentationElement, photographerPictureElement] = photographerModel.getUserCardDOM(true)

    const photographerHeader = document.querySelector('.photograph-header')

    photographerHeader.innerHTML = photographerPresentationElement
    photographerHeader.insertAdjacentElement('beforeend', contactButton)
    photographerHeader.insertAdjacentHTML('beforeend', photographerPictureElement)

}


function displayMedia(photographerName, media, index) {

    const mediaModel = MediaFactory(photographerName, media)
    
    const { mediaArticle, carouselItem } = mediaModel.getUserMediaDOM(index)
    
    galleryElement.insertAdjacentHTML('beforeend', mediaArticle)
    carouselItems.insertAdjacentHTML('beforeend', carouselItem)

}



function displayMedias(photographerName, photographerMedias) {
    photographerMedias.forEach((media, index) => {
        displayMedia(photographerName, media, index)
    })
}



function displayLikesTotalNumber(medias) {
    const likesElement = document.querySelector('.additional-information__likes-number')
    const likesTotalNumber = medias.reduce((acc, media) => acc + media.likes, 0)
    likesElement.textContent = likesTotalNumber
}


function displayPrice(price) {
    const priceElement = document.querySelector('.additional-information__price')
    priceElement.textContent = price + '€ / jour'
}


function displayStickyBar(price, medias) {
    displayLikesTotalNumber(medias)
    displayPrice(price)
}


function onModalClick(name) {

    contactButton.addEventListener('click', (e) => {
        const modalTitle = document.querySelector('.modal__title')
        modalTitle.innerHTML = `Contactez-moi <br> ${name}`
    })
}


async function setupSortPortfolioEvent(photographerName, medias) {

    let mediasSorted;

    filterButton.addEventListener('change', async (e) => {
        mediasSorted = await sortPortfolio(medias, e.target.value)
        galleryElement.innerHTML = ''
        carouselItems.innerHTML = ''        
        displayMedias(photographerName, mediasSorted)
    })
}


async function init() {

    // Récupère les datas des photographes
    const { photographer, photographerMedias } = await getPhotographerData();

    displayPhotographerInformation(photographer)

    onModalClick(photographer.name)
    displayStickyBar(photographer.price, photographerMedias)


    const mediasSorted = await sortPortfolio(photographerMedias, mediasSortTypeDefault)

    await displayMedias(photographer.name, mediasSorted)

    setupCarousel(galleryElement, photographerMedias.length)
    setupSortPortfolioEvent(photographer.name, mediasSorted)

};

window.addEventListener('load', () => init())

