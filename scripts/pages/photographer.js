//------- PAGE PHOTOGRAPHE test ----->>>>>
import { Photographer } from '../constructor/photographerModel.js'
import { Media } from '../constructor/mediaModel.js'
import { PhotographersApi } from '../Api/api.js'



class AppFactory {
    constructor() {
        this.Api = new PhotographersApi("data/photographers.json")
    }

    async init() {
        //-----------------------------------//
        // --- Bloc pour 1 photographe --- //

        // récup id du photographe
        const id = new URL(location.href).searchParams.get("id")
        const photographerId = parseInt(id)
        // récup des datas de 1 photographe
        const dataOnePhotographer = await this.Api.getOnePhotographer(photographerId)
        console.log(dataOnePhotographer);

        // on fabrique le photographe
        const photographerModel = new Photographer(dataOnePhotographer)
        console.log(photographerModel);
        // Récupération Photographe header et bloc stat template
        const headerTemplate = photographerModel.getPhotographerHeaderTemplate()
        const blocStatTemplate = photographerModel.getCardInfo()

        // Récuperation des éléments du dom
        const element = document.querySelector('.photographer-header')
        const eltBlocStat = document.querySelector('.bloc-stat')
        console.log(eltBlocStat);
        //render header template
        element.insertAdjacentHTML('beforeend', headerTemplate)
        // render blocStatTemplate
        eltBlocStat.insertAdjacentHTML('beforeend', blocStatTemplate)

        //Affiche le nom du photographe dans le formulaire
        displayNameInForm()

        //Ouvrture Fermeture Modal
        displayModal()
        closeModal()
        // ----------------------------------------------- //
        // -------- Les medias du photographe ----------- //

        // récup les datas media
        const dataMedia = await this.Api.getMediaOnePhotographer(photographerId)

        // on fabrique les medias (renvoi le tableau des medias)
        let mediasList = dataMedia.map(media => new Media(media))
        console.log(mediasList);

        //-----Insertion des card Média--------/
        // et Insertion du bloc totalLikes  !!!!!!!!!!!!!!!!!!
        let renderMedia = () => {
            let forIndex = ''
            let totalLikes = 0

            mediasList.forEach(media => {
                // valeur de totalLikes
                totalLikes = totalLikes += media.likes
                // tout les médias pour création
                forIndex = forIndex + media.getAllMedia()
            })

            const eltParent = document.getElementById('section')
            eltParent.insertAdjacentHTML('beforeend', forIndex)

            //------------------------------------//
            // render total des likes
            // récup l élément html
            const blocStat = document.querySelector('.bloc-stat')
            // --template totalLikes
            let totalLikesTemplate = `
            <div id='likes-content'>
              <p>${totalLikes}</p>
              <i class="fa-solid fa-heart"></i>
            </div>
            `
            //display totalLikes template
            blocStat.insertAdjacentHTML('afterbegin', totalLikesTemplate)

            // start gestion des likes
            addLikes()
            // Rafraichie position card
            refreshCardPosition()
            //--start lightbox
            startLightboxListener()
            //--start Tri
            startDropdownListener()

        }
        renderMedia()


    }

}

const app = new AppFactory()
app.init()



