import genericUtils from '../generic.js';

let currentItemPosition = 0

const modal = document.querySelector(".modal-carousel"),
    nextButton = document.querySelector('.carousel__paginate--right'),
    previousButton = document.querySelector('.carousel__paginate--left'),
    closeModalButton = document.querySelector('.modal-carousel__close'),
    rootItemSelector = '.media__link'

let modalFirstOpen = true

function createModalBehaviour(gallery, mediasLength) {

    gallery.addEventListener('click', e => onMediaClickEvent(e))
    gallery.addEventListener('keydown', e => onMediaClickEvent(e, 'keydown'))

    closeModalButton.addEventListener('click', () => closeModal)
    previousButton.addEventListener('click', () => goToPreviousSlide(mediasLength))
    nextButton.addEventListener('click', () => goToNextSlide(mediasLength))

    const validKeys = ['ArrowRight', 'ArrowLeft', 'Escape', 39, 37, 27];

    document.addEventListener('keydown', e => {

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
    })
}


function onMediaClickEvent(e, eventType='click') {

    const rootElement = e.target.closest(rootItemSelector)
    if (!rootElement) return
    
    if(eventType === 'keydown') {

        const keyName = e.keyCode ? e.keyCode : e.key
        
        if (keyName !== 'Enter' && keyName !== 13) {
            return;
        }
    }

    e.preventDefault()

    if (modalFirstOpen) {
        // Le modal vient d'être ouvert pour la première fois
            modalFirstOpen = false
    
        // Lance les étapes pour conserver le focus dans le modal. 
        const focusableElements = modal.querySelectorAll('[tabindex]:not([tabindex="-1"])')
        genericUtils.trapFocusOnModal(modal, focusableElements, modal, closeModalButton)        
    }

    const index = getMediaIndex(rootElement, rootItemSelector)         
    updateCarousel(index)

    displayModal()

}


function getMediaIndex(element, rootItemSelector) {

    const listElement = element.parentNode.parentNode.querySelectorAll(rootItemSelector)
    const index = [...listElement].indexOf(element);

    return index
}

function updateCarousel(index) {

    let lastItem;
    if (modal.className.includes('visible')) {
        lastItem = document.querySelector(`.item-${currentItemPosition}`)
    }

    currentItemPosition = index
    const currentItem = document.querySelector(`.item-${currentItemPosition}`)
    setNodeAttributes(currentItem, lastItem)
}


function displayModal() {
    modal.showModal()
    modal.classList.add('visible')
    modal.setAttribute('aria-hidden', 'false')
    modal.focus()
}

function closeModal() {

    const carouselItems = document.querySelectorAll('.carousel__item')

    removeDisplay(carouselItems)
    modal.close()
    modal.classList.remove('visible')
    modal.setAttribute('aria-hidden', 'true')
}


function removeDisplay(elements) {
    elements.forEach(element => element.style.display = 'none')
}

const setNodeAttributes = (currentItem, lastItem = undefined) => {

    currentItem.style.display = 'flex'
    currentItem.setAttribute('aria-hidden', 'false')

    if (lastItem) {
        lastItem.style.display = 'none'
        lastItem.setAttribute('aria-hidden', 'true')
    }
}


const goToNextSlide = (mediasLength) => {

    let currentItem, lastItem;

    if (currentItemPosition + 1 < mediasLength) {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition++
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    } else {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition = 0
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    }

    setNodeAttributes(currentItem, lastItem)
}

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