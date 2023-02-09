// --------------- FICHIER DE CONTRÔLE DE LA FONCTIONNALITE DE LIKES ---------------

const likesTotalElement = document.querySelector('.additional-information__likes-number')

/* Update les likes d'une création
    Paramètres :
        - Un élément html correspondant au bouton de like
    Renvoie :
        - Rien
*/
async function updateMediaLikes (element) {
    const likesNumberElement = element.parentNode.querySelector('.media__likes-number')
    const likesNumberContent = likesNumberElement.textContent
    const likesNumber = parseInt(likesNumberContent)

    let updateOperation = 1
    if (element.className.includes('liked')) {
        likesNumberElement.textContent = likesNumber - 1
        updateOperation = -1
    } else {
        likesNumberElement.textContent = likesNumber + 1
    }

    element.classList.toggle('liked')
    likesNumberElement.classList.toggle('liked')
    updateTotalLikes(updateOperation)
}

/* Update le nombre total de likes d'une création
    Paramètres :
        - Un chiffre à ajouter
    Renvoie :
        - Rien
*/
async function updateTotalLikes (updateOperation) {
    likesTotalElement.textContent = parseInt(likesTotalElement.textContent) + updateOperation
}

export { updateMediaLikes }
