async function updateMediaLikes(likesButtons) {
    
    likesButtons.forEach(likeButton => {

        likeButton.addEventListener('click', function(e) {

            const likesNumberElement = this.previousElementSibling,
                likesNumberContent = likesNumberElement.textContent,
                likesNumber = parseInt(likesNumberContent)

            let updateOperation = 1;
            if (this.className.includes('like-btn--liked')) {
                likesNumberElement.textContent = likesNumber - 1
                updateOperation = -1
            } else {
                likesNumberElement.textContent = likesNumber + 1
            }

            this.classList.toggle('like-btn--liked')

            updateTotalLikes(updateOperation)
        })
    })
}

async function updateTotalLikes(updateOperation) {
    const likesTotalElement = document.querySelector('.additional-information__likes-number')
    likesTotalElement.textContent = parseInt(likesTotalElement.textContent) + updateOperation
}

export { updateMediaLikes }