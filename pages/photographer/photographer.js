import {photographerFactory} from '../../scripts/factories/photographers.js';

async function getPhotographer(id) {
    const getPhotographer = fetch('../../data/photographers.json')
        .then(response => {
            if (response.ok) {
                return response.json()
                    .then(data => {
                            for (let valeur of data.photographers) {
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
    while (photos.firstChild) {
        photos.removeChild(photos.lastChild);
    }
    media.forEach((photo, index) => {
        const userPhoto = photographerFactory(photo, 'media', name, index);
        photos.appendChild(userPhoto);
    })
}

export function updateLightboxData(photo, index) {
    const lightbox = document.querySelector('.lightbox_img');
    const close = document.querySelector('#close_modal')
    close.focus()
    const leftArrow = document.createElement('button');
    leftArrow.className = ' fa-solid fa-angle-left'
    leftArrow.setAttribute('onClick', `previousPhoto(${index})`)
    lightbox.appendChild(leftArrow);
    if (photo.image) {
        const media = document.createElement('img');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.image}`);
        lightbox.appendChild(media);
    } else {
        const media = document.createElement('video');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.video}`);
        lightbox.appendChild(media);
    }
    const rightArrow = document.createElement('button');
    rightArrow.className = ' fa-solid fa-angle-right'
    rightArrow.setAttribute('onClick', `nextPhoto(${index})`)
    const title = document.querySelector('.title')
    title.innerHTML = photo.title;
    lightbox.appendChild(rightArrow);
}

async function sort(media) {
    const option = document.querySelectorAll('option')

    function sortPopular(media) {
        return media.sort((value1, value2) => value2.likes - value1.likes);
    }

    function sortDate(media) {
        return media.sort((value1, value2) => new Date(value2.date) - new Date(value1.date))
    }

    function sortTitle(media) {
        return media.sort((value1, value2) => {
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

    if (option[0].selected) {
        hideSelected();
        return sortPopular(media);
    }
    if (option[1].selected) {
        hideSelected();
        return sortDate(media);
    }
    if (option[2].selected) {
        hideSelected();
        return sortTitle(media);
    }
    return media;
}

export let media = [];
let photographer = undefined;
const id = getPhotographerId();

async function updateSort() {
    media = await sort(media);
    await displayMediaData(media, photographer.name)
}

async function init() {
    // Récupère les datas des photographes
    photographer = await getPhotographer(id);
    media = await getMedia(id);
    await displayPhotographerData(photographer);
    await updateSort();
}

init()
