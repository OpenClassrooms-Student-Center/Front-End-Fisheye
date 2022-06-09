class PhotographerPage {
    constructor() {
        // Element du DOM
        this.main = document.getElementById('main')

        // Api
        this.photographerApi = new PhotographerApi('/data/photographers.json')
        this.mediaApi = new MediaApi('/data/photographers.json')

        // Id du photographe
        this.id = this.getPhotographerId()

        // Photographes
        this.photographers = []

        // Media
        this.media = []

        // Media filtrés
        this.mediaFilter = []
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

    async displayPriceAndLikesOfMedia(likes) {
        const priceAndLikesDiv = new PriceAndLikesCard(likes)
        const divItem = priceAndLikesDiv.getPriceAndLikesDom()

        // Affiche la div du prix et des likes
        this.main.appendChild(divItem)
    }

    clearMediaSection() {
        // Element du DOM
        const mediaSection = document.querySelector('.media')
        mediaSection.textContent = ''
    }

    async displayMedia(media) {
        // Element du DOM
        const mediaSection = document.querySelector('.media')

        media.forEach((media) => {
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
    }

    async init() {
        // Récupère les datas des photographes dans un tableau
        this.photographers = await this.getPhotographers()

        // Affiche l'entête du photographe
        this.displayPhotographerHeader(this.photographers)

        // Récupère les datas des media dans un tableau
        this.media = await this.getMedia()

        // Récupère les media du photographe correspondant à l'id récupéré
        this.mediaFilter = this.filterMedia(this.media, this.id)

        // le total de like des media
        const likes = this.getLikes(this.mediaFilter)
        const sumLikes = this.getSumLikes(likes)

        // Affiche le total du prix et des likes des media
        this.displayPriceAndLikesOfMedia(sumLikes)

        let sorterIdContent = 'like'

        // Media trié par Popularité
        const mediaSortedByLike = new Sorter(
            this.mediaFilter,
            sorterIdContent
        ).mediaSorted()

        // Affiche les media par Popularité
        this.displayMedia(mediaSortedByLike)

        btnList.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (btn.id === 'like') {
                    // Supprimer la section media
                    this.clearMediaSection()

                    // Affiche les media par Popularité
                    this.displayMedia(mediaSortedByLike)
                } else if (btn.id === 'date') {
                    // Supprimer la section media et actualiser contenu de l'ID de triage
                    this.clearMediaSection()
                    sorterIdContent = 'date'

                    // Media trié par Date
                    const mediaSortedByDate = new Sorter(
                        this.mediaFilter,
                        sorterIdContent
                    ).mediaSorted()

                    // Affiche les media par Date
                    this.displayMedia(mediaSortedByDate)
                } else if (btn.id === 'title') {
                    // Supprimer la section media et actualiser contenu de l'ID de triage
                    this.clearMediaSection()
                    sorterIdContent = 'title'

                    // Media trié par Titre
                    const mediaSortedByTitle = new Sorter(
                        this.mediaFilter,
                        sorterIdContent
                    ).mediaSorted()

                    // Affiche les media par Titre
                    this.displayMedia(mediaSortedByTitle)
                } else {
                    throw new Error('Unknown type format')
                }
            })
        })
    }
}

const photographerPage = new PhotographerPage()
photographerPage.init()
