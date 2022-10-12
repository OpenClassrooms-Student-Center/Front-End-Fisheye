//-----------------------------------------------//
// -------- Fonction Pour le dropdown -------- //

// ----- Ouverture et Fermeture du dropdown -----//
// ---Récup élément html
const listBottom = document.querySelector('.selector-bloc')// bloc de 2 li du bas
const arrow = document.querySelector('#select-btn span')// boutton a changer en span !!!git add
const selected = document.getElementById('popularity')
const date = document.querySelector('#date')
const title = document.querySelector('#title')
const options = document.querySelectorAll('.selector')

// ----- Ouverture et Fermeture
isVisible = false

arrow.addEventListener('click', (e) => {
    //listBottom.classList.toggle("isVisible")  // method toggle()
    isVisible = !isVisible  // version ternere
    isVisible ? listBottom.classList.add("isVisible") : listBottom.classList.remove("isVisible")
})

// ------ System de selection
options.forEach(option => {

    option.addEventListener('click', () => {

        let value = selected.textContent
        // lélément cliquer passe en 1
        selected.textContent = option.textContent
        // l élément 1 prend la place de l'élément cliqué
        option.textContent = value
        // ferme le dropdown
        listBottom.classList.remove("isVisible")
    })
})


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
const sortDate = (data) => {
    let dataDate = data
    dataDate.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
    })
}
// ---Trier par Titre
const sortTitle = (data) => {
    let dataTitle = data
    dataTitle.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    })
}