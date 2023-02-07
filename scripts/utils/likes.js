
const likesTotalElement = document.querySelector('.additional-information__likes-number')

async function updateMediaLikes(element) {
    
    const likesNumberElement = element.parentNode.querySelector('.media__likes-number'),
        likesNumberContent = likesNumberElement.textContent,
        likesNumber = parseInt(likesNumberContent)

    let updateOperation = 1;
    if (element.className.includes('liked')) {
        likesNumberElement.textContent = likesNumber - 1
        updateOperation = -1
    } else {
        likesNumberElement.textContent = likesNumber + 1
    }

    element.classList.toggle('liked')
    element.parentNode.children[0].classList.toggle('liked')
    updateTotalLikes(updateOperation)
}

async function updateTotalLikes(updateOperation) {
    likesTotalElement.textContent = parseInt(likesTotalElement.textContent) + updateOperation
}
 
export { updateMediaLikes }