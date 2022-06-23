import { PhotographerApi, MediaApi } from '../api/Api.js'

import { MediaFactory } from '../factories/MediaFactory.js'

import { Photographer } from '../models/Photographer.js'

import { PhotographerCard } from '../templates/PhotographerCard.js'
import { VideoCard } from '../templates/VideoCard.js'
import { PictureCard } from '../templates/PictureCard.js'
import { PriceAndLikesCard } from '../templates/PriceAndLikesCard.js'

import { Sorter } from '../utils/Sorter.js'

class PhotographerPage {
    constructor() {
        // Element du DOM
        this.main = document.getElementById('main')

        // Api
        this.photographerApi = new PhotographerApi('/data/photographers.json')
        this.mediaApi = new MediaApi('/data/photographers.json')

        // Url
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

    async fetchPhotographerFiltered() {
        // Retourne le tableau de photographes
        const photographersData = await this.photographerApi.getPhotographers()

        this.photographerFiltered = this.findPhotographer(
            photographersData,
            this.id
        )

        return new Photographer(this.photographerFiltered)
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

    displayMediaSorted(media, sorter, photographer) {
        // Element du DOM
        const mediaSection = document.querySelector('.media')

        const mediaSorted = new Sorter(media, sorter).mediaSorted()

        mediaSorted.forEach((media) => {
            if (media.video) {
                const videoCard = new VideoCard(media, photographer)
                const videoCardDOM = videoCard.getVideoCardDom()
                mediaSection.appendChild(videoCardDOM)
                this.main.appendChild(mediaSection)
            } else if (media.image) {
                const pictureCard = new PictureCard(media, photographer)
                const pictureCardDOM = pictureCard.getPictureCardDom()
                mediaSection.appendChild(pictureCardDOM)
                this.main.appendChild(mediaSection)
            } else {
                throw new Error('Unknown type format')
            }
        })
    }

    clearMediaSection() {
        // Element du DOM
        const mediaSection = document.querySelector('.media')
        mediaSection.textContent = ''
    }

    async init() {
        // Récupère les datas des photographes dans un tableau
        this.photographer = await this.fetchPhotographerFiltered()

        // Affiche l'entête du photographe
        this.displayPhotographerHeader(this.photographer)

        // Récupère les datas des media dans un tableau
        this.mediaFiltered = await this.fetchMediaFiltered()

        // likes des media
        const likes = this.getLikes(this.mediaFiltered)

        // le total des likes des media
        const sumLikes = this.getSumLikes(likes)

        // Affiche le total du prix et des likes des media
        this.displayPriceAndLikesOfMedia(sumLikes, this.photographer.price)

        // Affiche les media par Popularité
        this.displayMediaSorted(this.mediaFiltered, 'like', this.photographer)

        // Element du DOM
        const btnList = document.querySelectorAll('.option')

        btnList.forEach((btn) => {
            btn.addEventListener('click', () => {
                switch (btn.id) {
                    case 'like':
                        // Supprimer la section media
                        this.clearMediaSection()

                        // Affiche les media par Popularité
                        this.displayMediaSorted(
                            this.mediaFiltered,
                            'like',
                            this.photographer
                        )
                        break
                    case 'date':
                        // Supprimer la section media
                        this.clearMediaSection()

                        // Affiche les media par Date
                        this.displayMediaSorted(
                            this.mediaFiltered,
                            'date',
                            this.photographer
                        )
                        break
                    case 'title':
                        // Supprimer la section
                        this.clearMediaSection()

                        // Affiche les media par Titre
                        this.displayMediaSorted(
                            this.mediaFiltered,
                            'title',
                            this.photographer
                        )
                        break
                }
            })
        })
    }
}

const photographerPage = new PhotographerPage()
photographerPage.init()
