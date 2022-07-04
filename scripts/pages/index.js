import { PhotographerApi } from '../api/Api.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCard } from '../templates/PhotographerCard.js'
class HomePage {
    constructor() {
        // Element du DOM
        this.photographersSection = document.querySelector(
            '.photographer_section'
        )

        // Api
        this.photographerApi = new PhotographerApi('/data/photographers.json')

        // Photographes
        this.photographers = []
    }

    async fetchPhotographers() {
        // Retourne le tableau de photographes
        const photographers = await this.photographerApi.getPhotographers()
        return photographers.map((photographer) => new Photographer(photographer))   
    }

    async displayData(photographers) {
        photographers.forEach((photographer) => {
            const photographerCard = new PhotographerCard(photographer)
            const userCardDOM = photographerCard.getUserCardDOM()

            this.photographersSection.appendChild(userCardDOM)
        })
    }

    async init() {
        // Récupère les datas des photographes dans un tableau
        this.photographers = await this.fetchPhotographers()

        // Affiche les données des photographes
        this.displayData(this.photographers)
    }
}

const homePage = new HomePage()
homePage.init()
