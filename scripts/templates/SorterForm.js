import { PictureCard } from './PictureCard.js'
import { VideoCard } from './VideoCard.js'

import { Sorter } from '../utils/sorter/Sorter.js'
import { Lightbox } from '../utils/lightbox/Lightbox.js'

export { SorterForm }

class SorterForm {
    constructor(media, photographer, sorter) {
        // Element du DOM
        this.main = document.getElementById('main')
        this.mediaSection = document.querySelector('.media')

        // Url de la page
        this.url = new URL(window.location)

        this.media = media
        this.sorter = sorter
        this.photographer = photographer
    }

    // Retourne le nom du bouton de tri
    getSortButtonName(sorter) {
        let sorterText

        switch (sorter) {
            case 'like':
                sorterText = 'Popularité'
                break
            case 'date':
                sorterText = 'Date'
                break
            case 'title':
                sorterText = 'Titre'
                break
            default:
                sorterText = ''
        }
        return sorterText
    }

    // Affiche les media triés
    displayMediaSorted(media) {
        this.clearMediaSection()

        media.forEach((media) => {
            if (media.video) {
                const videoCard = new VideoCard(media, this.photographer)
                this.mediaSection.appendChild(videoCard.getVideoCardDom())
                this.main.appendChild(this.mediaSection)
            } else if (media.image) {
                const pictureCard = new PictureCard(media, this.photographer)
                this.mediaSection.appendChild(pictureCard.getPictureCardDom())
                this.main.appendChild(this.mediaSection)
            } else {
                throw new Error('Unknown type format')
            }
        })

        Lightbox.init()
    }

    // Efface les media affichés dans la section media
    clearMediaSection() {
        this.mediaSection.textContent = ''
    }

    // charge le bouton de tri
    loadTheSortingButton() {
        // Element du DOM
        const sortButtonSelected = document.querySelector('.sorter__selected')
        const sortButtonName = document.querySelector('.sorter__selected__name')
        const sortButtonList = document.querySelector('.sorter__list')
        const sortButtons = document.querySelectorAll('.sorter__list__option')

        // Actualise le nom du bouton de tri
        sortButtonName.innerText = this.getSortButtonName(this.sorter)

        // Indique le bouton de la liste actif
        sortButtonList.setAttribute('aria-activedescendant', this.sorter)

        sortButtonSelected.addEventListener('click', () => {
            // Masque le bouton de tri sélectionné
            sortButtonSelected.style.display = 'none'

            // Indique que la liste est étendue
            sortButtonSelected.setAttribute('aria-expanded', 'true')

            // Affiche la liste de tri
            sortButtonList.style.display = 'block'

            // Met le focus sur le bouton 'Popularité' de la liste de tri
            document.getElementById('like').focus()
        })
        sortButtons.forEach((sortButton) => {
            // Sélectionne le bouton de tri actif
            if (sortButton.id === this.sorter) {
                sortButton.setAttribute('aria-selected', 'true')
            } else {
                sortButton.setAttribute('aria-selected', 'false')
            }

            // Tri les media lorsqu'un user clique sur un bouton de tri
            sortButton.addEventListener('click', () => {
                this.sorter = sortButton.id

                /* 
                    Met à jour le paramètre 'sorter' dans l'url de la page
                    Rafraîchi le DOM
                */
                this.url.searchParams.set('sorter', this.sorter)
                window.history.pushState({}, '', this.url)

                // Masque la liste de tri
                sortButtonList.style.display = 'none'

                // Affiche le bouton de tri sélectionné
                sortButtonSelected.style.display = null

                // Indique que la liste n'est pas étendue
                sortButtonSelected.setAttribute('aria-expanded', 'false')

                /*
                    Met le focus sur le bouton de tri sélectionné
                    (exclus) pour améliorer les performances
                */
                // sortButtonSelected.focus()

                this.init()
            })
        })
    }

    // Initialise le formulaire qui affiche les media triés
    init() {
        this.loadTheSortingButton()

        // Affiche les media triés
        this.displayMediaSorted(
            new Sorter(this.media, this.sorter).mediaSorted()
        )
    }
}
