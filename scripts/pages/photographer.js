
// --------------- FICHIER DE CONTRÔLE DE LA PAGE DE PROFIL D'UN PHOTOGRAPHE --------------- 


/****************************** MODULES **************************************** */
/********************************************************************** */

import { fetchDataFromApi } from "../services/Api.js"
import photographerFactory from "../factories/photographer.js"
import sorter from "../utils/sort.js"
import { createContactModalBehaviour, createCarouselModalBehaviour } from "../utils/modals/index.js"
import MediaFactory from "../factories/media.js"
import { updateMediaLikes } from "../utils/likes.js"
import updateLoaderText from "../utils/loaders.js"


/****************************** PROCEDURES **************************************** */
/********************************************************************** */

const galleryElement = document.querySelector('.gallery'),
    carouselItems = document.querySelector('.carousel__items'),
    filterButton = document.querySelector('#sort-portfolio'),
    contactButton = document.querySelector('.contact_button'),
    modal = document.querySelector('.modal-contact');

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

    const { photographer, photographerMedias } = await getPhotographerData(),
        photographerName = photographer.name;

    displayPhotographerHeader(photographer)

    // Affichage de l'encart
    displayStickyBar(photographer.price, photographerMedias)
    
    // Récupère l'objet associé à la fonction de tri
    const portfolioSorter = sorter(photographerName, photographerMedias)
    portfolioSorter.init()

    // Affichage des médias avec le tri par défaut
    sortPortfolioAndDisplayMedias(portfolioSorter.getMediasorted, photographerName, photographerMedias)

    // Initie la configuration le comportement du formulaire
    const contactModalBehaviour = createContactModalBehaviour(modal)
    contactModalBehaviour.init()

    // Configure le comportement du carousel
    createCarouselModalBehaviour(galleryElement, photographerMedias.length)

    // Configure la fonctionnalité de like des créations
    setupLikesBehaviour(galleryElement)
    
    // Gère l'apparition du formulaire de contact
    contactButton.addEventListener('click', () => contactModalBehaviour.displayModal(photographerName))  

    // Gère le comportement suite à un changement de critère de tri
    filterButton.addEventListener('change', async (e) => {
        sortPortfolioAndDisplayMedias(portfolioSorter.getMediasorted, photographerName, photographerMedias, e.target.value)
    })
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

    const data = await fetchDataFromApi(fetchingURL)

    const { photographers, media } = data,
        // Chaque photographe est associé à un id unique
        photographer = photographers.filter(item => item.id === id)[0],
        // Chaque création est un objet où l'id du photographe est indiqué
        photographerMedias = media.filter(item => item.photographerId === id)

    return { photographer, photographerMedias }
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


/* Remplis l'encart des informations nécessaires
    Paramètres :
        - Le tarif d'un photographe
        - les créations d'un photographe
    Renvoie :
        - Rien 
*/

function displayStickyBar(price, medias) {

    const additionalInformationsElement = document.querySelector('.additional-information')

    // Les texte à lire par les SR
    const likesForSR = displayLikesTotalNumber(additionalInformationsElement, medias)
    const priceForSR = displayPrice(additionalInformationsElement, price)

    additionalInformationsElement.setAttribute('aria-label', `${likesForSR}, ${priceForSR}`)
}


/* Calcule le nombre de likes reçus par un photographe
    Paramètres :
        - Un élement HTML contenant le bloc concerné
        - Les créations d'un photographe
    Renvoie :
        - Du texte indiquant le nombre de likes
*/
function displayLikesTotalNumber(element, medias) {

    const likesElement = element.querySelector('.additional-information__likes-number')
    const likesTotalNumber = medias.reduce((acc, media) => acc + media.likes, 0)
    likesElement.textContent = likesTotalNumber

    // Texte pour SR
    const likesElementSR = `Nombre total de likes, ${likesTotalNumber}`

    return likesElementSR
}


/* Définit le texte à afficher concernant le tarif d'un photographe
    Paramètres :
        - Un élement HTML contenant le bloc concerné
        - Le tarif du photographe
    Renvoie :
        - Du texte indiquant le tarif
*/
function displayPrice(element, price) {

    const priceElement = element.querySelector('.additional-information__price')
    priceElement.textContent = price + '€ / jour'

    const priceElementSR = `Tarif du photographe, ${price}€ par jour`

    return priceElementSR
}


/* Ajoute une création à la gallerie et au carousel
    Paramètres :
        - Le nom d'un photographe
        - Une créations du photographe
        - La position de la création dans la liste des créations
    Renvoie :
        - Rien
*/
function displayMedia(photographerName, media, index) {

    // Instanciation de l'objet possédant la méthode de construction de l'élément
    const mediaModel = MediaFactory(photographerName, media)

    const { mediaArticle, carouselItem } = mediaModel.getUserMediaDOM(index)
    galleryElement.insertAdjacentHTML('beforeend', mediaArticle)
    carouselItems.insertAdjacentHTML('beforeend', carouselItem)
}


/* Dispose les créations d'un photographe dans le DOM
    Paramètres :
        - Un nom de photographe
        - Les créations d'un photographe
    Renvoie :
        - Rien
*/
function displayMedias(photographerName, photographerMedias) {
    photographerMedias.forEach((media, index) => {
        displayMedia(photographerName, media, index)
    })
}


/* Tri les vidéos et les dispose dans le DOM 
    Paramètres :
        - Une fonction de tri
        - Le nom d'un photographe
        - Les créations d'un photographe
        - Le critère de tri
    Renvoie :
        - Rien
*/
async function sortPortfolioAndDisplayMedias(sortingFunction, photographerName, medias, sortType = 'popularity') {
    
    // Réception des médias triés selon le critère
    const mediasSorted = await sortingFunction(medias, sortType);
    galleryElement.innerHTML = ''
    carouselItems.innerHTML = ''
    // Disposition des créations sur le DOM
    displayMedias(photographerName, mediasSorted)
}


/* Update les likes d'une création si le bouton like est cliqué
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
function setupLikesBehaviour() {

    const rootItemSelector = '.like-btn'

    galleryElement.addEventListener('click', e => {
        const rootElement = e.target.closest(rootItemSelector)
        if (!rootElement) return
        // Le click a été effectué sur un bouton de like, on update le nombre de likes
        updateMediaLikes(rootElement)
    })

    galleryElement.addEventListener('keydown', e => {
        const rootElement = e.target.closest(rootItemSelector)
        if (!rootElement) return

        const keyName = e.key || e.keyCode 
        // Le touche a été appuyée sur un bouton de like, on update le nombre de likes
        if (keyName === 'Enter' || keyName === 13) updateMediaLikes(rootElement)
    })
}