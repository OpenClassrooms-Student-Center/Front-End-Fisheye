// FETCH PHOTOGRAPHES
export async function getPhotographers() {
    let photographers = await fetch('data/photographers.json')
    if (photographers.ok === true) {
        return photographers.json();
    }
    throw new Error ('Impossible de contacter le serveur')
}
// PROMISE FETCH PHOTOGRAPHES BY ID
export async function getPhotographerById (userId) {
    let photographers = await fetch('data/photographers.json')
    if (photographers.ok === true) {
        return photographers.json(userId);
    }
    throw new Error('Impossible de contacter le serveur')
}

// PROMISE FETCH MEDIAS PHOTOGRAPHES PAR LEUR ID
export async function getMediaByPhotographerId (userId) {
    return fetch('data/photographers.json')
        .then(response => response.json())
        .then(response => {
            return response.media.filter(media => media.photographerId === userId)
        })
        .catch(err => {
            throw new Error('Impossible de contacter le serveur', err)
        })
}

async function  getAllMedias () {
    return fetch('data/photographers.json')
        .then(response => response.json())
        .then(response => {
            return response.media
        })
        .catch(err => {
            throw new Error('Impossible de contacter le serveur', err)
        })
}
