//-----------------------------------------------//
// -------- Fonction Pour le dropdown -------- //

// ----- Ouverture et Fermeture du dropdown -----//
// ---Récup élément html
let listBottom = document.querySelector('#selector-bloc')
let arrow = document.querySelector('#arrow-down')// boutton a changer en span !!!

// ----- Ouverture
arrow.addEventListener('click', (e) => {
    listBottom.style.display = "block"

})
// ----- Fermeture


//---------------------------------//
// ------- Tri des datas ------- //
// --Ou sont les datas
// =>>>> let mediasList = dataMedia.map(media => new Media(media))
//

// ---Trier par Popularité
/**
 * 
 * @param {array} media 
 * Trier par Popularité
 */
const sortLikes = (data) => {
    let dataLikes = data
    dataLikes.sort((a, b) => {
        return b.likes - a.likes
    })
}
// ---Trier par Date
// ---Trier par Titre