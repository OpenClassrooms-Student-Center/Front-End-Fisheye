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
    const userCardDOM = photographerFactory(photographer, 'detail', null, null, updateLightboxData);
    photographHeader.appendChild(userCardDOM);
    updateContactModalData(photographer);
}

function updateContactModalData(photographer) {
    const photographName = document.querySelector('.photographer-modal-name');
    const photographerName = document.createElement('p');
    photographerName.innerHTML = photographer.name;
    photographName.appendChild(photographerName);
}


function displayLikesModalData(photographer) {
    const price = document.getElementById('price');
    price.innerHTML = photographer.price + '€ / jour';

    let likes = 0;
    for (let i = 0; i < media.length; i++) {
        likes += media[i].likes;
    }

    const likesModal = document.getElementById('likes');
    likesModal.innerHTML = likes.toString();
}

let like = [];

function updateLikesModalData(data, index) {
    const regular_heart = document.querySelectorAll('.fa-regular');
    const solid_heart = document.querySelectorAll('.fa-solid');
    const likes = document.querySelectorAll('.like');

    if (like[index]) {
        regular_heart[index].style.display = 'flex';
        solid_heart[index].style.display = 'none';
        likes[index].innerHTML = data.likes - 1;
        data.likes = data.likes - 1;
        like[index] = false;
    } else {
        regular_heart[index].style.display = 'none';
        solid_heart[index].style.display = 'flex';
        likes[index].innerHTML = data.likes + 1;
        data.likes = data.likes + 1;
        like[index] = true;
    }
    displayLikesModalData(photographer);
}

async function displayMediaData(media, name) {
    const photos = document.querySelector('.photo');
    while (photos.firstChild) {
        photos.removeChild(photos.lastChild);
    }
    like = new Array(media.length).fill(false)
    console.log(like);
    media.forEach((photo, index) => {
        const userPhoto = photographerFactory(photo, 'media', name, index, updateLightboxData, updateLikesModalData);
        photos.appendChild(userPhoto);
    })
}

function updateLightboxData(index) {
    const photo = media[index];
    const lightbox = document.querySelector('.lightbox_img');
    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.lastChild);
    }
    const close = document.querySelector('#close_modal')
    close.focus()
    const leftArrow = document.getElementById('lightbox_left');
    leftArrow.onclick = () => {
        if (index === 0) index = media.length;
        updateLightboxData(index - 1);
    };
    if (photo.image) {
        const media = document.createElement('img');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.image}`);
        lightbox.appendChild(media);
    } else {
        const media = document.createElement('video');
        media.setAttribute('src', `../../assets/photos/${photographer.name}/${photo.video}`);
        lightbox.appendChild(media);
    }
    const rightArrow = document.getElementById('lightbox_right');
    rightArrow.onclick = () => {
        if (index === media.length - 1) index = -1;
        updateLightboxData(index + 1);
    };
    const title = document.querySelector('.title')
    title.innerHTML = photo.title;
}

async function sort(media) {
    const option = document.querySelectorAll('option')
    option.forEach(option => option.onclick = updateSort)

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
    await displayLikesModalData(photographer)
    await updateSort();
}

init()
