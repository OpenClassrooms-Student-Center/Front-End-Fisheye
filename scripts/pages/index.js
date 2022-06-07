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

    async getPhotographers() {
        // Retourne le tableau de photographes
        return this.photographerApi.getPhotographers()
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
        this.photographers = await this.getPhotographers()

        // Affiche les données des photographes
        this.displayData(this.photographers)
    }
}

const homePage = new HomePage()
homePage.init()
