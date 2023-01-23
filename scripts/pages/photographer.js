//Mettre le code JavaScript lié à la page photographer.html
function getPhotographerId() {

    const paramsURL = (new URL(document.location)).searchParams,
        id = paramsURL.get('id')

    return id
}

async function getPhotographerData() {

    const id = parseInt(getPhotographerId())

    const { photographers, media } = await getPhotographers()

    const photographer = photographers.filter(item => item.id === id)[0],
        photographerMedias = media.filter(item => item.photographerId === id)

    return { photographer, photographerMedias}
}

// async function displayPhotographerData(photographer, media) {

//     const photographerModel = photographerFactory(photographer);

//     getPhotographerProfileDom(photographer)
//     getPhotographerMediaDom(media)

// }

getPhotographerData()


