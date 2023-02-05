import { ApiJson } from "../services/Api.js"
import photographerFactory from "../factories/photographer.js"
import MediaFactory from "../factories/media.js"
import { setupCarousel } from "../utils/carousel.js"
import { sortPortfolio } from "../utils/sort.js"
import { updateMediaLikes } from "../utils/likes.js"

const galleryElement = document.querySelector('.gallery'),
    carouselItems = document.querySelector('.carousel__items'),
    mediasSortTypeDefault = 'popularity',
    filterButton = document.querySelector('#sort-portfolio'),
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
    const likesElement = document.querySelector('.additional-information__likes-number'),
        likesElementSR = likesElement.nextElementSibling

    const likesTotalNumber = medias.reduce((acc, media) => acc + media.likes, 0)
    likesElement.textContent = likesTotalNumber
    likesElementSR.textContent = `Nombre total de likes, ${likesTotalNumber}`
}


function displayPrice(price) {
    const priceElement = document.querySelector('.additional-information__price'),
        priceElementSR = priceElement.nextElementSibling

    priceElement.textContent = price + '€ / jour'
    priceElementSR.textContent = `Tarif du photographe, ${price}€ par jour`
    
}


function displayStickyBar(price, medias) {
    displayLikesTotalNumber(medias)
    displayPrice(price)
}


function onModalClick(name) {

    contactButton.addEventListener('click', (e) => {
        const modalTitle = document.querySelector('.modal__title'),
            modalContact = document.querySelector('.modal-contact')

        modalTitle.innerHTML = `Contactez-moi <br> ${name}`
        modalContact.setAttribute('aria-label', `Contactez-Moi ${name}`)
    })

    contactButton.addEventListener('keydown', (e) => {

        const keyName = e.keyCode ? e.keyCode : e.key

        if ( (keyName === 'Enter' || keyName === 13) || ( (keyName === 'Alt' || keyName === 18 || e.altKey) && (keyName === 'Control' || keyName === 17 || key.ctrlKey) && (keyName === ' ' || keyName === 32 || key.Space) ) ) {
            displayModal(e, index)
        }
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


function setupLikesBehaviour(gallery) {
    const likeElements = gallery.querySelectorAll('.like-btn')
    updateMediaLikes(likeElements)
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
    setupLikesBehaviour(galleryElement)
};

window.addEventListener('load', () => init())

document.addEventListener('keydown', (e) => {

    const keyName = e.keyCode ? e.keyCode : e.key

    if (keyName === 'Escape' || keyName === 27) {
        closeModal()
    }
})

