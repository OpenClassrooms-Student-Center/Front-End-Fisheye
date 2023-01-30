let currentItemPosition = 0

const modalCarousel = document.querySelector(".modal-carousel"),
    nextButton = document.querySelector('.carousel__paginate--right'),
    previousButton = document.querySelector('.carousel__paginate--left'),
    closeModalButton = document.querySelector('.modal-carousel__close')

function setupCarousel(gallery, mediasLength) {

    const medias = gallery.querySelectorAll('.media__link'),
        carouselItems = document.querySelectorAll('.carousel__item')

    medias.forEach((media, index) => media.addEventListener('click', (e) => {

        e.preventDefault()
        
        let lastItem;
        if (modalCarousel.className.includes('visible')) {
            lastItem = document.querySelector(`.item-${currentItemPosition}`)
        }

        currentItemPosition = index
        const currentItem = document.querySelector(`.item-${currentItemPosition}`)
        setNodeAttributes(currentItem, lastItem)

        displayCarouselModal()
    }))

    
    closeModalButton.addEventListener('click', () => closeCarouselModal(carouselItems))
    previousButton.addEventListener('click', () => goToPreviousSlide(mediasLength))
    nextButton.addEventListener('click', () => goToNextSlide(mediasLength))

    document.addEventListener('keydown', e => {

        e.preventDefault()

        const keyName = e.keyCode ? e.keyCode : e.key
        
        if (keyName === 'ArrowRight' || keyName === 39) {
            goToNextSlide(mediasLength)
        } else if (keyName === 'ArrowLeft' || keyName === 37) {
            goToPreviousSlide(mediasLength)
        }
    })    
}


function displayCarouselModal() {
    modalCarousel.classList.add('visible')
}

function closeCarouselModal(elements) {
    modalCarousel.classList.remove('visible')
    removeDisplay(elements)
}


function removeDisplay(elements) {
    elements.forEach(element => element.style.display = 'none')
}

const setNodeAttributes = (currentItem, lastItem=undefined) => {
    
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

    if (currentItemPosition - 1 >=  0) {
        
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

export {setupCarousel} 