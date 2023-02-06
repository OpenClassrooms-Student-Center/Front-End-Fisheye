let currentItemPosition = 0

const modalCarousel = document.querySelector(".modal-carousel"),
    nextButton = document.querySelector('.carousel__paginate--right'),
    previousButton = document.querySelector('.carousel__paginate--left'),
    closeModalButton = document.querySelector('.modal-carousel__close'),
    mainElement = document.querySelector('main'),
    headerElement = document.querySelector('header'),
    rootItemSelector = 'article'

function setupCarousel(gallery, mediasLength) {

    const carouselItems = document.querySelectorAll('.carousel__item')

    gallery.addEventListener('click', e => {
        const rootElement = e.target.closest(rootItemSelector)

        if (!rootElement) return

        const listElement = rootElement.parentNode.querySelectorAll(rootItemSelector)
        const index = [...listElement].indexOf(rootElement);
    
        e.preventDefault()
        initCarousel(index)
    })

    gallery.addEventListener('keydown', e => {
        const rootElement = e.target.closest(rootItemSelector)

        if (!rootElement) return

        const listElement = rootElement.parentNode.querySelectorAll(rootItemSelector)
        const index = [...listElement].indexOf(rootElement);
        const keyName = e.keyCode ? e.keyCode : e.key
        
        if ((keyName === 'Enter' || keyName === 13) || ((keyName === 'Alt' || keyName === 18 || e.altKey) && (keyName === 'Control' || keyName === 17 || key.ctrlKey) && (keyName === ' ' || keyName === 32 || key.Space))) {
            e.preventDefault()
            initCarousel(index)
        }
    })


    closeModalButton.addEventListener('click', () => closeCarouselModal(carouselItems))
    previousButton.addEventListener('click', () => goToPreviousSlide(mediasLength))
    nextButton.addEventListener('click', () => goToNextSlide(mediasLength))

    const validKeys = ['ArrowRight', 'ArrowLeft', 'Escape', 39, 37, 27];

    document.addEventListener('keydown', e => {

        const keyName = e.keyCode ? e.keyCode : e.key
        
        if (!validKeys.includes(keyName) || !modalCarousel.className.includes('visible')) return;
        
        e.preventDefault();

        if (keyName === 'ArrowRight' || keyName === 39) {
            goToNextSlide(mediasLength)
        } else if (keyName === 'ArrowLeft' || keyName === 37) {
            goToPreviousSlide(mediasLength)
        } else if (keyName === 'Escape' || keyName === 27) {
            closeCarouselModal(carouselItems)
        }
    })
}


function initCarousel(index) {

    let lastItem;
    if (modalCarousel.className.includes('visible')) {
        lastItem = document.querySelector(`.item-${currentItemPosition}`)
    }

    currentItemPosition = index
    const currentItem = document.querySelector(`.item-${currentItemPosition}`)
    setNodeAttributes(currentItem, lastItem)

    mainElement.setAttribute('aria-hidden', "true")
    headerElement.setAttribute('aria-hidden', "true")

    displayCarouselModal()
    const mainFocusableElement = currentItem.querySelector('.carousel__media')
    mainFocusableElement.focus()

}


function displayCarouselModal() {
    modalCarousel.classList.add('visible')
    modalCarousel.setAttribute('aria-hidden', 'false')
}

function closeCarouselModal(elements) {
    modalCarousel.classList.remove('visible')
    removeDisplay(elements)
    mainElement.setAttribute('aria-hidden', "false")
    headerElement.setAttribute('aria-hidden', "false")
    modalCarousel.setAttribute('aria-hidden', 'true')
}


function removeDisplay(elements) {
    elements.forEach(element => element.style.display = 'none')
}

const setNodeAttributes = (currentItem, lastItem = undefined) => {

    currentItem.style.display = 'block'
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