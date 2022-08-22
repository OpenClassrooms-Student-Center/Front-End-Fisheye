async function getPhotographer(id) {
    const getPhotographer = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                            for (valeur of data.photographers) {
                                if (valeur.id.toString() === id) {
                                    return valeur;
                                }
                            }
                        }
                    )
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        })
    return (
        await getPhotographer
    )
}

function getPhotographerId() {
    const url = window.location.href;
    const DOM_url = new URL(url);
    const search_params = new URLSearchParams(DOM_url.search);

    if (search_params.has('id')) {
        return search_params.get('id')
    }
}

async function getMedia(id) {
    const getMedia = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                        return data.media.filter(value => value.photographerId.toString() === id);
                    })
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        })
    return (
        await getMedia
    )
}

async function displayPhotographerData(photographer) {
    const photographHeader = document.querySelector('.photographer-header');
    const userCardDOM = photographerFactory(photographer, 'detail');
    photographHeader.appendChild(userCardDOM);
    updateModalData(photographer);
}

function updateModalData(photographer) {
    const photographerName = document.createElement('p');
    photographerName.innerHTML = photographer.name;
    const photographName = document.querySelector('.photographer-modal-name');
    photographName.appendChild(photographerName);
}

async function displayMediaData(media, name) {
    const photos = document.querySelector('.photo');
    media.forEach((photo) => {
        const userPhoto = photographerFactory(photo, 'media', name);
        photos.appendChild(userPhoto);
        updateLightboxData(photo, name)
    })
}

function updateLightboxData(photo, name) {
    const lightbox = document.querySelector('.lightbox_img');
    if (photo.image) {
        const media = document.createElement('img');
        media.className = photo.title;
        media.setAttribute('src', `../../assets/photos/${name}/${photo.image}`);
        lightbox.appendChild(media);
    } else {
        const media = document.createElement('video');
        media.className = photo.title;
        media.setAttribute('src', `../../assets/photos/${name}/${photo.video}`);
        lightbox.appendChild(media);
    }
}

async function sort(media) {
    const option = document.querySelectorAll('option')

    function sortPopular(media) {
        media.sort((value1, value2) => value2.likes - value1.likes);
    }

    function sortDate(media) {
        media.sort((value1, value2) => new Date(value2.date) - new Date(value1.date))
    }

    function sortTitle(media) {
        media.sort((value1, value2) => {
            if (value1.title < value2.title) {
                return -1;
            } else if (value1.title > value2.title) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    function hideSelected() {
        const option = document.querySelectorAll('option')
        option.forEach(value => {
            if (value.selected === true) {
                value.hidden = true;
            } else if (value.selected === false) {
                value.hidden = false;
            }
        })
    }

    if (option[0].selected === true) {
        hideSelected();
        return sortPopular(media);
    }
    if (option[1].selected === true) {
        hideSelected();
        return sortDate(media);
    }
    if (option[2].selected === true) {
        hideSelected();
        return sortTitle(media);
    }
}

async function init() {
    // Récupère les datas des photographes
    const id = getPhotographerId();
    const photographer = await getPhotographer(id);
    await displayPhotographerData(photographer);
    const media = await getMedia(id);
    await sort(media);
    await displayMediaData(media, photographer.name);
}

init()
