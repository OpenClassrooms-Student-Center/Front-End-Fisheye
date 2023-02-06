let currentItemPosition = 0

const modal = document.querySelector(".modal-carousel"),
    nextButton = document.querySelector('.carousel__paginate--right'),
    previousButton = document.querySelector('.carousel__paginate--left'),
    closeModalButton = document.querySelector('.modal-carousel__close'),
    rootItemSelector = '.media__link'

function setupCarousel(gallery, mediasLength) {

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
    const index = getMediaIndex(rootElement, rootItemSelector)         
    initCarousel(index)

}


function getMediaIndex(element, rootItemSelector) {

    const listElement = element.parentNode.parentNode.querySelectorAll(rootItemSelector)
    const index = [...listElement].indexOf(element);

    return index
}

function initCarousel(index) {

    let lastItem;
    if (modal.className.includes('visible')) {
        lastItem = document.querySelector(`.item-${currentItemPosition}`)
    }

    currentItemPosition = index
    const currentItem = document.querySelector(`.item-${currentItemPosition}`)
    setNodeAttributes(currentItem, lastItem)

    displayModal()

    const mainFocusableElement = currentItem.querySelector('.carousel__media')
    mainFocusableElement.focus()

}


function displayModal() {
    modal.showModal()
    modal.classList.add('visible')
    modal.setAttribute('aria-hidden', 'false')
}

function closeModal() {

    const carouselItems = document.querySelectorAll('.carousel__item')

    removeDisplay(carouselItems)
    modal.close()
    console.log(modal.classList)
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


export { setupCarousel } 