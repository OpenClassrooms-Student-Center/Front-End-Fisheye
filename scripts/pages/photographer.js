async function getPhotographers() {
    // Retourne le tableau de photographes
    const photographerApi = new PhotographerApi("/data/photographers.json")
    return photographerApi.get()
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
    return parseInt(searchParams.get("photographerId"), 10)
}

async function filterDataOnePhotographer(photographers, photographerId) {
    return photographers.filter(
        (photographer) => photographer.id === photographerId
    )[0]
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers()

    // Affiche l'entête du photographe
    displayPhotographerHeader(photographers)
}

init()
