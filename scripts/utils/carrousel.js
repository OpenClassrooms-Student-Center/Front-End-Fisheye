


const previousButtons = document.querySelectorAll('.prev-image'),
    nextButtons = document.querySelectorAll('.next-image')
    carouselItems = document.querySelectorAll('.carousel-item')

const carouselItemsLength = carouselItems.length

let currentItemPosition = 0,
    carouselInterval;
 
carouselItems.forEach((item, index) => {
    item.classList.add(`item-${index}`)
})

const goToNextSlide = () => {

    let currentItem, lastItem;

    if (currentItemPosition + 1 < carouselItemsLength) {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition++
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    } else {

        lastItem = document.querySelector(`.item-${currentItemPosition}`)
    
        currentItemPosition = 0
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    }

    setNodeAttributes(lastItem, currentItem)
}
 
const goToPreviousSlide = () => {

    if (currentItemPosition - 1 >=  0) {
        
        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition--
        currentItem = document.querySelector(`.item-${currentItemPosition}`)

    } else {
        
        lastItem = document.querySelector(`.item-${currentItemPosition}`)

        currentItemPosition = carouselItemsLength - 1
        currentItem = document.querySelector(`.item-${currentItemPosition}`)
        
    }

    setNodeAttributes(lastItem, currentItem)
}
 
 
const setNodeAttributes = (lastItem, currentItem) => {
   lastItem.style.display = 'none'
   currentItem.style.display = 'block'
   lastItem.setAttribute('aria-hidden', 'true')
   currentItem.setAttribute('aria-hidden', 'false')
}
 
previousButtons.forEach(element => {
    element.addEventListener('click', () => goToPreviousSlide())
})
nextButtons.forEach(element => {
    element.addEventListener('click', () => goToPreviousSlide())
})

 
document.addEventListener('keydown', e => {
    const keyName = e.keyCode ? e.keyCode : e.key
    
    if (keyName === 'ArrowRight' || keyName === 39) {
        goToNextSlide()
    } else if (keyCode === 37) {
        goToPreviousSlide()
    }
})

