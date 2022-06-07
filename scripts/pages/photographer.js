class PhotographerPage {
    constructor() {
        // Element du DOM
        this.main = document.getElementById('main')

        // Api
        this.photographerApi = new PhotographerApi('/data/photographers.json')
        this.mediaApi = new MediaApi('/data/photographers.json')

        // Photographes
        this.photographers = []

        // Media
        this.media = []

        // ID du photographe
        this.id = this.getPhotographerId()
    }

    async getPhotographers() {
        // Retourne le tableau de photographes
        return this.photographerApi.getPhotographers()
    }

    async getMedia() {
        // Retourne le tableau des media
        return this.mediaApi.getMedia()
    }

    getPhotographerId() {
        const link = window.location.search
        const searchParams = new URLSearchParams(link)

        // Retourne l'id du photographe contenu dans le lien
        return parseInt(searchParams.get('photographerId'), 10)
    }

    filterDataOnePhotographer(photographers, photographerId) {
        return photographers.filter(
            (photographer) => photographer.id === photographerId
        )[0]
    }

    async displayPhotographerHeader(photographers) {
        // filtre les données du photographe correspondant à l'id récupéré
        const photographer = this.filterDataOnePhotographer(
            photographers,
            this.id
        )

        const photographerCard = new PhotographerCard(photographer)

        // Affiche l'entête du photographe
        photographerCard.getPhotographerHeader()
    }

    filterMedia(media, photographerId) {
        // Retourne les media du photographe
        return media.filter((media) => media.photographerId === photographerId)
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

    loadButton() {
        // Element du DOM
        const btnSelected = document.querySelector('btn__selected')
        const sorterList = document.querySelector('sorter__list')

        btnSelected.addEventListener('click', (e) => {
            sorterList.style.display = 'block'
            e.style.display = 'none'
        })
    }

    async displayPriceAndLikesOfMedia(prices, likes) {
        const priceAndLikesDiv = new PriceAndLikesCard(prices, likes)
        const divItem = priceAndLikesDiv.getPriceAndLikesDom()

        // Affiche la div du prix et des likes
        this.main.appendChild(divItem)
    }

    async displayMedia(media) {
        // Récupère les media du photographe correspondant à l'id récupéré
        const mediaFilter = this.filterMedia(media, this.id)
        console.log(mediaFilter)

        // Element du DOM
        const mediaSection = document.createElement('div')
        mediaSection.setAttribute('class', 'media')

        mediaFilter.forEach((media) => {
            if (media.video) {
                const mediaVideoItem = new MediaFactory(media, 'video')
                const videoCard = new VideoCard(mediaVideoItem)
                const videoCardDOM = videoCard.getVideoCardDom()
                mediaSection.appendChild(videoCardDOM)
                this.main.appendChild(mediaSection)
            } else if (media.image) {
                const mediaPictureItem = new MediaFactory(media, 'picture')
                const pictureCard = new PictureCard(mediaPictureItem)
                const pictureCardDOM = pictureCard.getPictureCardDom()
                mediaSection.appendChild(pictureCardDOM)
                this.main.appendChild(mediaSection)
            } else {
                throw new Error('Unknown type format')
            }
        })

        // le total de like des media
        const likes = this.getLikes(mediaFilter)
        const sumLikes = this.getSumLikes(likes)

        // Affiche le total du prix et des likes des media
        this.displayPriceAndLikesOfMedia(sumLikes)
    }

    async init() {
        // Récupère les datas des photographes dans un tableau
        this.photographers = await this.getPhotographers()

        // Récupère les datas des media dans un tableau
        this.media = await this.getMedia()

        // Affiche l'entête du photographe
        this.displayPhotographerHeader(this.photographers)

        // Affiche les media
        this.displayMedia(this.media)
    }
}

const photographerPage = new PhotographerPage()
photographerPage.init()
