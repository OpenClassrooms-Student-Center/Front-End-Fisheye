
// --------------- FICHIER DE CONTRÔLE DE LA PAGE DE PROFIL D'UN PHOTOGRAPHE --------------- 


/****************************** MODULES **************************************** */
/********************************************************************** */

import { fetchDataFromApi } from "../services/Api.js"
import photographerFactory from "../factories/photographer.js"
import { setupContactModalBehaviour } from "../utils/modals/index.js"
import MediaFactory from "../factories/media.js"
import { setupCarousel } from "../utils/carousel.js"
import { sortPortfolio } from "../utils/sort.js"
import { updateMediaLikes } from "../utils/likes.js"
import updateLoaderText from "../utils/loaders.js"


/****************************** PROCEDURES **************************************** */
/********************************************************************** */

const galleryElement = document.querySelector('.gallery'),
    carouselItems = document.querySelector('.carousel__items'),
    mediasSortTypeDefault = 'popularity',
    filterButton = document.querySelector('#sort-portfolio'),
    contactButton = document.querySelector('.contact_button')

init();


/****************************** FUNCTIONS **************************************** */
/********************************************************************** */

/* Lance les différentes étapes nécessaires pour le bon affichage de la page
    Paramètres :
        - Acun
    Renvoie :
        - Rien
*/
async function init() {

    // Pour les SR : indique que la page est chargée
    setTimeout(updateLoaderText, 3000)

    const { photographer, photographerMedias } = await getPhotographerData();

    displayPhotographerHeader(photographer)

    // Apparition du formulaire de contact
    setupContactModalBehaviour(photographer.name)

    // Affichage de l'encart
    displayStickyBar(photographer.price, photographerMedias)


    const mediasSorted = await sortPortfolio(photographerMedias, mediasSortTypeDefault)

    await displayMedias(photographer.name, mediasSorted)

    setupCarousel(galleryElement, photographerMedias.length)
    setupSortPortfolioEvent(photographer.name, mediasSorted)
    setupLikesBehaviour(galleryElement)

};


/* Récupère les infos du photographe ainsi que ses créations
    Paramètres :
        - Aucun
    Renvoie :
        - Un objet contenant l'objet relatif aux infos du photographe 
        et une liste regroupant l'ensemble de ses créations
*/
async function getPhotographerData() {

    const id = parseInt(getPhotographerId())

    const fetchingURL = '../../data/photographers.json'; 

    const data  = await fetchDataFromApi(fetchingURL)

    const { photographers, media } = data,
        // Chaque photographe est associé à un id unique
        photographer = photographers.filter(item => item.id === id)[0],
        // Chaque création est un objet où l'id du photographe est indiqué
        photographerMedias = media.filter(item => item.photographerId === id)

    return { photographer, photographerMedias}
}


/* Récupère le paramètre id d'une url
    Paramètres :
        - Aucun
    Renvoie :
        - l'id
*/
function getPhotographerId() {

    const paramsURL = (new URL(document.location)).searchParams,
        id = paramsURL.get('id')

    return id
}

/* Dispose les éléments dans le bloc présentant les infos du photographe
    Paramètres :
        - Un objet représentant un photographe
    Renvoie :
        - Rien 
*/
function displayPhotographerHeader(photographer) {

    // Création des éléments adéquats via la méthode getUserCardDOM 
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