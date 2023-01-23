async function getPhotographers() {

    const photographersFetchingURL = '../../data/photographers.json';

    let response;
    try {
        response = await fetch(photographersFetchingURL)
    } catch {
        console.log("Erreur dans le code de requête des photographes")
    }

    if (response.ok) {
        results = await response.json()
    } else {
        console.log("Le réseau n'a pas renvoyé une bonne réponse")
    }

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: results.photographers,
        media: results.media
    })
}

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