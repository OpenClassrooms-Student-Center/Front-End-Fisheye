import { PhotographerApi, MediaApi } from '../api/Api.js'

import { MediaFactory } from '../factories/MediaFactory.js'

import { Photographer } from '../models/Photographer.js'

import { PhotographerCard } from '../templates/PhotographerCard.js'
import { VideoCard } from '../templates/VideoCard.js'
import { PictureCard } from '../templates/PictureCard.js'
import { PriceAndLikesCard } from '../templates/PriceAndLikesCard.js'
import { SorterForm } from '../templates/SorterForm.js'

import { Sorter } from '../utils/sorter/Sorter.js'
import { Lightbox } from '../utils/lightbox/Lightbox.js'

class PhotographerPage {
    constructor() {
        // Elements du DOM
        this.main = document.getElementById('main')
        this.mediaSection = document.querySelector('.media')

        // Api
        this.photographerApi = new PhotographerApi('/data/photographers.json')
        this.mediaApi = new MediaApi('/data/photographers.json')

        // Url de la page
        this.url = new URL(window.location)

        // Id du photographe
        this.id = this.getPhotographerIdFromUrl()

        // Photographes
        this.photographerFiltered = null

        // Media filtrés
        this.mediaFiltered = []
    }

    getPhotographerIdFromUrl() {
        const params = new URLSearchParams(this.url.search)

        // Retourne l'id du photographe contenu dans le lien
        return parseInt(params.get('photographerId'), 10)
    }

    // Retourne la valeur de 'sorter' de l'url de la page
    getSorterFromURL() {
        const params = this.url.searchParams
        return params.get('sorter')
    }

    async fetchPhotographerFiltered() {
        // Retourne le tableau de photographes
        const photographersData = await this.photographerApi.getPhotographers()
        const photographerDataFiltered = this.findPhotographer(
            photographersData,
            this.id
        )

        return new Photographer(photographerDataFiltered)
    }

    findPhotographer(photographers, photographerId) {
        return photographers.find(
            (photographer) => photographer.id === photographerId
        )
    }

    async fetchMediaFiltered() {
        // Retourne le tableau des media du photographe correspondant à l'id récupéré
        const mediaData = await this.mediaApi.getMedia()
        const mediaDataFiltered = this.filterMedia(mediaData, this.id)
        const videoData = mediaDataFiltered
            .filter((media) => media.video)
            .map((video) => new MediaFactory(video, 'video'))
        const pictureData = mediaDataFiltered
            .filter((media) => media.image)
            .map((picture) => new MediaFactory(picture, 'picture'))

        return videoData.concat(pictureData)
    }

    filterMedia(media, photographerId) {
        // Retourne les media du photographe
        return media.filter((media) => media.photographerId === photographerId)
    }

    displayPhotographerHeader(photographer) {
        const photographerCard = new PhotographerCard(photographer)

        // Affiche l'entête du photographe
        photographerCard.getPhotographerHeader()
    }

    displayPriceAndLikesOfMedia(likes, price) {
        const priceAndLikesDiv = new PriceAndLikesCard(likes, price)
        const divItem = priceAndLikesDiv.getPriceAndLikesDom()

        // Affiche la div du prix et des likes
        this.main.appendChild(divItem)
    }

    getLikes(data) {
        let array = []

        for (const element of data) {
            array.push(element.likes)
        }

        // Retourne un tableau contenant les likes de chaque media
        return array
    }

    getSumLikes(array) {
        let sumLikes

        sumLikes = array.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        )

        // Retourne la somme total de likes des media
        return sumLikes
    }

    displayMediaByLike(media, photographer) {
        const mediaSorted = new Sorter(media, 'like').mediaSorted()

        mediaSorted.forEach((media) => {
            if (media.video) {
                const videoCard = new VideoCard(media, photographer)
                this.mediaSection.appendChild(videoCard.getVideoCardDom())
                this.main.appendChild(this.mediaSection)
            } else if (media.image) {
                const pictureCard = new PictureCard(media, photographer)
                this.mediaSection.appendChild(pictureCard.getPictureCardDom())
                this.main.appendChild(this.mediaSection)
            } else {
                throw new Error('Unknown type format')
            }
        })

        Lightbox.init()
    }

    async init() {
        // Récupère les datas du photographes
        this.photographerFiltered = await this.fetchPhotographerFiltered()

        // Affiche l'entête du photographe
        this.displayPhotographerHeader(this.photographerFiltered)

        // Récupère les datas des media dans un tableau
        this.mediaFiltered = await this.fetchMediaFiltered()

        // likes des media
        const likes = this.getLikes(this.mediaFiltered)

        // le total des likes des media
        const sumLikes = this.getSumLikes(likes)

        // Affiche le total du prix et des likes des media
        this.displayPriceAndLikesOfMedia(
            sumLikes,
            this.photographerFiltered.price
        )

        let sorter = this.getSorterFromURL()

        /*
            si la valeur du trieur est fausse,
            l'utilisateur est redirigé vers le trieur par défaut : like
        */
        if (!['like', 'date', 'title'].includes(this.sorter)) {
            /* 
                Met à jour le paramètre 'sorter' dans l'url de la page
                Rafraîchi le DOM
            */
            this.url.searchParams.set('sorter', 'like')
            window.history.pushState({}, '', this.url)
            sorter = 'like'
        }

        // Formulaire qui affiche les media triés en fonction du bouton de tri
        const sorterForm = new SorterForm(
            this.mediaFiltered,
            this.photographerFiltered,
            sorter
        )

        // Initialise le formulaire 
        sorterForm.init()
    }
}

const photographerPage = new PhotographerPage()
photographerPage.init()
