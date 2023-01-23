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