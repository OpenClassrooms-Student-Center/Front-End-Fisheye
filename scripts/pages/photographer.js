function getPhotographerName() {
    const name = window.location.search
    const searchParams = new URLSearchParams(name)

    // Retourne le nom du photographe contenu dans le lien
    return searchParams.get('photographerName')
}

async function getPhotographers() {
    // Retourne le tableau de photographes
    const photographerApi = new PhotographerApi('/data/photographers.json')
    return photographerApi.getPhotographers()
}

async function getMedia() {
    // Retourne le tableau des media
    const mediaApi = new MediaApi('/data/photographers.json')
    return mediaApi.getMedia()
}

async function getPhotographerId() {
    const link = window.location.search
    const searchParams = new URLSearchParams(link)

    // Retourne l'id du photographe contenu dans le lien
    return parseInt(searchParams.get('photographerId'), 10)
}

async function filterDataOnePhotographer(photographers, photographerId) {
    return photographers.filter(
        (photographer) => photographer.id === photographerId
    )[0]
}

async function displayPhotographerHeader(photographers) {
    // Récupère l'id d'un photographe
    const id = await getPhotographerId()

    // filtre les données du photographe correspondant à l'id récupéré
    const photographer = await filterDataOnePhotographer(photographers, id)

    const photographerModel = new PhotographerCard(photographer)

    // Affiche l'entête du photographe
    photographerModel.getPhotographerHeader()
}

async function filterMedia(media, photographerId) {
    // Retourne les media du photographe
    return media.filter((media) => media.photographerId === photographerId)
}

async function filterPictures(media) {
    // Retourne les media photos filtrés
    return media.filter((media) => media.image)
}

async function filterVideo(media) {
    // Retourne le media video filtré
    return media.filter((media) => media.video)[0]
}

async function displayMedia(media) {
    // Récupère l'id d'un photographe
    const id = await getPhotographerId()

    // Récupère les media du photographe correspondant à l'id récupéré
    const mediaFilter = await filterMedia(media, id)

    // Récupère les media photos filtrés
    const mediaPictures = await filterPictures(mediaFilter)

    // Récupère le media video filtré
    const mediaVideo = await filterVideo(mediaFilter)

    const main = document.getElementById('main')
    const mediaSection = document.createElement('div')
    mediaSection.setAttribute('class', 'media')

    // Affiche le media video
    const mediaVideoItem = new MediaFactory(mediaVideo, 'video')
    const videoModel = new VideoCard(mediaVideoItem)
    const videoCardDOM = videoModel.getVideoCardDom()
    mediaSection.appendChild(videoCardDOM)
    main.appendChild(mediaSection)

    // Affiche les media photos
    mediaPictures.forEach((media) => {
        const mediaPictureItem = new MediaFactory(media, 'picture')
        const pictureModel = new PictureCard(mediaPictureItem)
        const pictureCardDOM = pictureModel.getPictureCardDom()
        mediaSection.appendChild(pictureCardDOM)
        main.appendChild(mediaSection)
    })
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()

    // Récupère les datas des media
    const media = await getMedia()

    // Affiche l'entête du photographe
    displayPhotographerHeader(photographers)

    // Affiche les media
    displayMedia(media)
}

init()
