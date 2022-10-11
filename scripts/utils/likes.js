//-------------------------------//
// ----Gestion d'ajout de likes

const addLikes = () => {
    // ---Récup des éléments likes par médias
    let elts = document.querySelectorAll('.likes-value')
    // ---Récup de l'élément du total des likes
    let eltsTotalLikes = document.querySelector('.bloc-stat p')
    // ---Récup la valeur de totalLikes
    let totalLikes = parseInt(eltsTotalLikes.innerText)
    // ---Boucle sur toute les checkbox
    const checkbox = document.querySelectorAll('input[name = "fav"]')
    for (let i = 0; i < checkbox.length; i++) {

        checkbox[i].addEventListener('click', () => {
            //--récup des éléments like par média
            let eltLikeByMedia = elts[i]
            //--récup la valeur de like par média
            let likeByMedia = parseInt(elts[i].innerText)
            // si c liké
            if (checkbox[i].checked == true) {
                // ---maj des likes par media
                let addLike = likeByMedia + 1
                eltLikeByMedia.innerText = addLike
                // --maj total likes
                let addToTotalLikes = totalLikes += 1
                eltsTotalLikes.innerText = addToTotalLikes

                // --- si disLiké
            } else {
                // ---maj des likes par media
                let addLike = likeByMedia - 1
                eltLikeByMedia.innerText = addLike
                // --maj total likes
                let addToTotalLikes = totalLikes -= 1
                eltsTotalLikes.innerText = addToTotalLikes

            }

        })
    }

}