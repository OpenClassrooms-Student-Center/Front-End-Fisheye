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

        //---------------------------------------------------//
        //-- Affiche le nom du photographe dans le formulaire
        displayNameInForm()

        //------------------------------//
        // -- Ouvrture Modal -- //
        displayModal()

        // ----------------------------------------------- //
        // -------- Les medias du photographe ----------- //

        // récup les datas media
        const dataMedia = await this.Api.getMediaOnePhotographer(photographerId)

        // on fabrique les medias (renvoi le tableau des medias)
        let mediasList = dataMedia.map(media => new Media(media))


        //-----Création des card Média--------/
        // et crétion du bloc totalLikes  !!!!!!!!!!!!!!!!!!
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
            // -- display totalLikes template
            blocStat.insertAdjacentHTML('afterbegin', totalLikesTemplate)
            // -- ajouter enlever likes
            addLikes()
        }
        renderMedia()

        // ------- Création des cards Médias ------- //
        /**
         * Création des cards Médias
         */
        const renderCard = () => {
            let forIndex = ''
            mediasList.forEach(media => {
                // tout les médias pour création
                forIndex = forIndex + media.getAllMedia()
            })
            const eltParent = document.getElementById('section')
            eltParent.insertAdjacentHTML('beforeend', forIndex)
            // -- ajouter enlever likes
            addLikes()
        }

        // --------------- Reset card média dom ----------------- //
        const resetRenderCard = () => {
            const eltParent = document.getElementById('section')
            eltParent.innerHTML = ''
        }

        //-------------------------------------------------------//
        //---------------- gestion des tris ---------------------//
        const selected = document.getElementById('popularity')
        const options = document.querySelectorAll('.selector')


        options.forEach(option => {
            option.addEventListener('click', () => {

                // ---Ranger par Date
                if (selected.textContent == 'Date') {
                    resetRenderCard()
                    sortDate(mediasList)
                    renderCard()

                }
                // --- Ranger par Titre
                if (selected.textContent == 'Titre') {
                    resetRenderCard()
                    sortTitle(mediasList)
                    renderCard()

                }

            })
        })

        //------------------------------------------------//
        // --------------- lightbox ------------------ //
        const arrayCardInDom = document.querySelectorAll('.card-image')
        console.log(arrayCardInDom);
        //----open lightbox

        const imageCard = document.querySelectorAll('.picture')
        imageCard.forEach(image => {
            image.addEventListener('click', () => {
                const lightbox = document.querySelector('.lightbox')
                lightbox.style.display = 'block'
            })
        })



        //----close lightbox
        const closedButton = document.querySelector('.close-lightbox')
        const lightbox = document.querySelector('.lightbox')
        closedButton.addEventListener('click', () => {
            lightbox.style.display = 'none'
        })
        //---Récupération de lélément par son id
        const getImageById = (id) => {
            return arrayCardInDom.find(element => element.id == id)
        }

        //----Traitement display card
        arrayCardInDom.forEach(card => {
            console.log(card);
            card.addEventListener('click', (e) => {
                let cardId = e.currentTarget.dataset.id;

                // 0 => récupéré l image
                let image = document.querySelector('.picture')
                console.log(image);
                // 0+ => récupéré le titre

                // 1 => affiché image clické dans la modal
                const cible = document.querySelector('.lightbox-container')
                cible.insertAdjacentHTML('beforeend', image)
                // 2 => next image
                // 3 => prévious image

            })


        })



        //***********************************test */
        /*let forIndex = ''
        let totalLikes = 0

        mediasList.forEach(media => {
            console.log(media);
            totalLikes = totalLikes += media.likes
            console.log(totalLikes);
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
        // -- display totalLikes template
        blocStat.insertAdjacentHTML('afterbegin', totalLikesTemplate)*/

        //*****************************************************
        //*********  TEST FONCTION LIKES isoler dans likes.js***********/
        //console.log(totalLikes);
        // ---Traitement des likes et totalLikes
        //addLikes()



        /*
        //-----------------LIKES----------------------------//
        // récupere tout les likes media d'un photographe
        let tabLikes = []
        dataMedia.map(media => tabLikes.push(media.likes))
        let totalLikes = tabLikes.reduce((acc, val) => acc + val)
        console.log('total des likes :' + totalLikes)
        // récup l élément html
        const blocStat = document.querySelector('.bloc-stat')
        console.log(blocStat);
        let totalLikesTemplate = `
            <p>${totalLikes}<i class="fa-solid fa-heart"></i></p>
        `
        // -- display totalLikes
        blocStat.insertAdjacentHTML('afterbegin', totalLikesTemplate)
        */
    }

}

const app = new AppFactory()
app.init()



