
// ----- Ouverture et Fermeture du dropdown -----//
// ---Récup élément html
const listBottom = document.querySelector('.selector-bloc')// bloc de 2 li du bas
const arrow = document.querySelector('#select-btn span')
const arrowImg = document.querySelector('#select-btn span img')

const selected = document.getElementById('popularity')
const date = document.querySelector('#date')
const title = document.querySelector('#title')

const options = document.querySelectorAll('.selector')
const section = document.querySelector('#section')

// ----- Ouverture et Fermeture
isVisible = false

arrow.addEventListener('click', (e) => {
    //listBottom.classList.toggle("isVisible")  // method toggle()
    isVisible = !isVisible  // version ternere
    isVisible ? listBottom.classList.add("isVisible") : listBottom.classList.remove("isVisible")
    isVisible ? arrowImg.classList.add("rotate") : arrowImg.classList.remove("rotate")
})

let allCards = []

// // ------ System de selection
let startDropdownListener = () => {
    // trie de base
    sortLikes()
    addLikes()
    startLightboxListener()
    console.log('dans startDropdownListener');

    options.forEach(option => {

        option.addEventListener('click', (e) => {

            let firstcontainer = selected.textContent
            console.log(firstcontainer);
            let valueClicked = e.target.innerHTML
            console.log(valueClicked);
            let valueClickedContainer = e.target
            console.log(valueClickedContainer);

            console.log(selected.innerHTML);
            console.log(valueClickedContainer.innerHTML);
            //Filtre media ici
            sortMedia(valueClicked)
            // lélément cliquer passe en 1
            selected.innerHTML = valueClicked;
            valueClickedContainer.innerHTML = firstcontainer;

            listBottom.classList.remove("isVisible")

        })
    })

}



const sortMedia = (valueClicked) => {

    if (valueClicked == 'Titre') {
        console.log('dans titre');
        //trie par titre
        sortTitle()
        addLikes()
        startLightboxListener()
    } else if (valueClicked == 'Date') {
        console.log('dans date');
        // trie array par date
        sortDate()
        //refreshLikes()
        addLikes()
        startLightboxListener()


    } else {
        console.log('yes POPULARITE')
        sortLikes()
        //refreshLikes()
        addLikes()
        startLightboxListener()
    }

}

const renderMediaSort = (newArraySort) => {
    // Clear card container
    section.innerHTML = ''
    // render media card after sort likes
    for (let card of newArraySort) {
        // template pas moyen dataset
        let template = `<div class='card-image'>${card.innerHTML}</div>`
        section.insertAdjacentHTML('beforeend', template)
    }
}



// ---Trier par Date

const sortDate = () => {
    allCards = document.querySelectorAll('.card-image')

    let newArraySortByDate = [...allCards].sort((a, b) => {
        return new Date(b.childNodes[1].dataset.date) - new Date(a.childNodes[1].dataset.date)
    })
    console.log(newArraySortByDate);
    // test d inserer newArraySortByDate
    console.log(allCards);

    //render sortdate
    renderMediaSort(newArraySortByDate)
}


// ---Trier par Popularité

const sortLikes = () => {
    allCards = document.querySelectorAll('.card-image')

    // --- sort
    let newArraySortByLikes = [...allCards].sort((a, b) => {
        return b.childNodes[1].dataset.likes - a.childNodes[1].dataset.likes
    })
    // render media card after sort likes
    renderMediaSort(newArraySortByLikes)

}

// ---Trier par Titre
const sortTitle = () => {
    allCards = document.querySelectorAll('.card-image')

    let newArraySortByTitles = [...allCards].sort((a, b) => {
        return a.childNodes[1].dataset.title.toLowerCase().localeCompare(b.childNodes[1].dataset.title.toLowerCase())
    })

    // render media card after sort title
    renderMediaSort(newArraySortByTitles)
}


