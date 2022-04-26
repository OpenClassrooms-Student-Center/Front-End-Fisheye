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

async function displayPhotographerHeader(photographers) {
    // Récupère l'id d'un photographe
    const id = await getPhotographerId()

    // filtre les données du photographe correspondant à l'id récupéré
    const photographer = await filterDataOnePhotographer(photographers, id)

    const photographerModel = new PhotographerFactory(photographer)

    // Affiche l'entête du photographe
    photographerModel.getPhotographerHeader()
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

async function displayMedia(media) {
    // Récupère l'id d'un photographe
    const id = await getPhotographerId()

    // filtre les données du photographe correspondant à l'id récupéré
    // const mediaList = await filterMedia(media, id)
    return filterMedia(media, id)

    // const mediaList = new MediaFactory(media)
}

async function filterMedia(media, photographerId) {
    return media.filter((media) => media.photographerId === photographerId)
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()

    // Récupère les datas des media
    const media = await getMedia()

    // Affiche l'entête du photographe
    displayPhotographerHeader(photographers)

    // Affiche les media
    console.log(displayMedia(media))
}

init()
