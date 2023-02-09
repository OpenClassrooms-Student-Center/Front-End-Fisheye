// --------------- FICHIER DE CONTRÔLE DU CAROUSEL --------------- 

import genericUtils from '../generic.js';

let currentItemPosition = 0

const modal = document.querySelector(".modal-carousel"),
    nextButton = document.querySelector('.carousel__paginate--right'),
    previousButton = document.querySelector('.carousel__paginate--left'),
    closeModalButton = document.querySelector('.modal-carousel__close'),
    rootItemSelector = '.media__link'

let modalFirstOpen = true


/****************************** FUNCTIONS **************************************** */
/********************************************************************** */


/* Définit le comportement du carousel
    Paramètres :
        - Acun
    Renvoie :
        - Rien
*/
function createModalBehaviour(gallery, mediasLength) {

    gallery.addEventListener('click', e => onMediaClickEvent(e))
    gallery.addEventListener('keydown', e => onMediaClickEvent(e, 'keydown'))

    closeModalButton.addEventListener('click', closeModal)
    closeModalButton.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 || e.key === 'Enter') {
            e.preventDefault()
            closeModal()
        } 
    })
        
    previousButton.addEventListener('click', () => goToPreviousSlide(mediasLength))
    nextButton.addEventListener('click', () => goToNextSlide(mediasLength))

    document.addEventListener('keydown', (e) => moveInOutModal(e, mediasLength) )
}


/* Update les éléments du carousel et l'ouvre
    Paramètres :
        - L'event déclencheur de l'action
        - le type d'event
    Renvoie :
        - Rien
*/
function onMediaClickEvent(e, eventType='click') {

    // Check si l'élément cliqué est une création d'un photographe
    const rootElement = e.target.closest(rootItemSelector)
    if (!rootElement) return
    
    // S'il s'agit d'une touche appuyée, on check qu'il s'agit bien de la touche entrée
    if(eventType === 'keydown') {
    
        const keyName = e.keyCode ? e.keyCode : e.key
        
        if (keyName !== 'Enter' && keyName !== 13) {
            return;
        }
    }

    e.preventDefault()

    if (modalFirstOpen) {
    // Le modal vient d'être ouvert pour la première fois
    // Il faut définir comment le focus doit être "emprisonné" dans le modal
            modalFirstOpen = false
    
        const focusableElements = modal.querySelectorAll('[tabindex]:not([tabindex="-1"])')
        genericUtils.trapFocusOnModal(modal, focusableElements, modal, closeModalButton)        
    }

    // Position de la création dans le DOM
    const index = getMediaIndex(rootElement, rootItemSelector)         
    updateCarousel(index)

    displayModal()

}

/* Récupère l'index d'une création selon l'ordre d'apparition dans le DOM
    Paramètres :
        - Un élément HMTL correspondant à une création
        - le sélecteur de cet élément 
    Renvoie :
        - L'index
*/
function getMediaIndex(element, rootItemSelector) {

    // Le sélecteur est utilisé pour récupérer toutes les autres créations
    const listElement = element.parentNode.parentNode.querySelectorAll(rootItemSelector)
    const index = [...listElement].indexOf(element);

    return index
}


/* Update le carousel pour que la première image soit celle cliquée
    Paramètres :
        - La position de l'élément
    Renvoie :
        - Rien
*/
function updateCarousel(index) {

    let lastItem;
    if (modal.className.includes('visible')) {
        lastItem = document.querySelector(`.item-${currentItemPosition}`)
    }
        
    currentItemPosition = index
    const currentItem = document.querySelector(`.item-${currentItemPosition}`)
    setNodeAttributes(currentItem, lastItem)
}


/* Affiche le modal et ajoute les différents attributs/classes nécessaires
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
function displayModal() {
    modal.showModal()
    modal.classList.add('visible')
    modal.setAttribute('aria-hidden', 'false')
    modal.focus()
}


/* Définition du comportement du carousel si des touches du claviers sont appuyées
    Paramètres :
        - Un event
        - La longueur de la liste des créations
    Renvoie :
        - Rien
*/
function moveInOutModal(e, mediasLength) {

    const validKeys = ['ArrowRight', 'ArrowLeft', 'Escape', 39, 37, 27];

    const keyName = e.keyCode ? e.keyCode : e.key
        
    if (!validKeys.includes(keyName) || !modal.className.includes('visible')) return;
    
    e.preventDefault();

    if (keyName === 'ArrowRight' || keyName === 39) {
        goToNextSlide(mediasLength)
    } else if (keyName === 'ArrowLeft' || keyName === 37) {
        goToPreviousSlide(mediasLength)
    } else if (keyName === 'Escape' || keyName === 27) {
        closeModal()
    }
}


/* Ferme le carousel
    Paramètres :
        - Aucun
    Renvoie :
        - Rien
*/
function closeModal() {

    const carouselItems = document.querySelectorAll('.carousel__item')

    carouselItems.forEach(item => item.style.display = 'none')
    modal.close()
    modal.classList.remove('visible')
    modal.setAttribute('aria-hidden', 'true')
}


/* Donne les attributs appropriés aux éléments du carousel
    Paramètres :
        - La création visionnée
        - La création précédemment visionnée
    Renvoie :
        - Rien
*/
const setNodeAttributes = (currentItem, lastItem = undefined) => {

    currentItem.style.display = 'flex'
    currentItem.setAttribute('aria-hidden', 'false')

    if (lastItem) {
        lastItem.style.display = 'none'
        lastItem.setAttribute('aria-hidden', 'true')
    }
}


/* Se déplace sur l'image suivante du carousel
    Paramètres :
        - Le nombre de créations
    Renvoie :
        - Rien
*/
const goToNextSlide = (mediasLength) => {

    let currentItem, lastItem;

    if (currentItemPosition < mediasLength - 1) {
    // On est, au moment du clic, sur une image autre que la dernière, on peut donc continuer d'avancer
        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition++
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    } else {
    // On est déjà sur la dernière image, on revient donc au point de départ 

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition = 0
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    }

    setNodeAttributes(currentItem, lastItem)
}


/* Même chose que pour la fonction permettant d'avancer d'une image mais l'inverse ici
*/
const goToPreviousSlide = (mediasLength) => {

    let currentItem, lastItem;

    if (currentItemPosition - 1 >= 0) {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition--
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    } else {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition = mediasLength - 1
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    }

    setNodeAttributes(currentItem, lastItem)
}


export { createModalBehaviour } 