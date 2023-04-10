"use_strict";

const selectDivElt = document.querySelector(".dropdown-label");
const ulMediaElt = document.querySelector(".media ul");

/**
 * 
 * @returns {object} - return photographers data and media
 */
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = response.json();

    return photographers;
}

/**
 * 
 * @param {object} photographers 
 * @returns {object} - return photographer by name
 */
function getPhotographerByName(photographers) {
    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');

    return photographers.filter((photographerByName) => { 
        return photographerByName.name == name 
    });
}

/**
 * 
 * @param {object} media 
 * @returns {object} - return media photographer
 */
function getPhotographerMedia(media) {
    const query = window.location.search;
    const id = new URLSearchParams(query).get('id');

    return media.filter((media) => { 
        return media.photographerId == id 
    })
}

/**
 * 
 * @param {object} media 
 * @returns {object} - return popular media of photographer
 */
function getPhotographerMediaByPopular(media) {
    const photographerMedia = getPhotographerMedia(media);

    return photographerMedia.sort(function(a,b) { 
        return b.likes - a.likes 
    });
}

/**
 * 
 * @param {object} media - return photographer media by descending date
 * @returns {object}
 */
function getPhotographerMediaByDateDesc(media) {
    const photographerMedia = getPhotographerMedia(media);

    return photographerMedia.sort(function(a,b) { 
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
    });
}

/**
 * 
 * @param {object} media - return photographer media by ascending title
 * @returns {object}
 */
function getPhotographerMediaByTitleAsc(media) {
    const photographerMedia = getPhotographerMedia(media);

    return photographerMedia.sort(function(a,b) { 
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    });
}

/**
 * 
 * @param {object} media
 */
function insertMediaDOM(media) {
    const photographerMediaModel = photographerMediaFactory(media);
    const mediaCardDOM = photographerMediaModel.getMediaCardDOM();
    ulMediaElt.appendChild(mediaCardDOM);
}

/**
 * 
 * @param {HTMLElement} photographerPopularMedia 
 * @param {HTMLElement} totalLikes
 */
function setPhotographerPopularMedia(photographerPopularMedia, totalLikes) {
    const mediaByPopularElt = document.querySelector(".dropdown-label");

    mediaByPopularElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        photographerPopularMedia.forEach(media => {
            insertMediaDOM(media);
            likePhotographerMedia(totalLikes);
        });
    });
}

/**
 * 
 * @param {object} mediaByDateDesc 
 * @param {number} totalLikes
 */
function setMediaByDateDesc(mediaByDateDesc, totalLikes) {
    const mediaDateDescElt = document.querySelector(".mediaDateDesc");

    mediaDateDescElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        mediaByDateDesc.forEach(media => {
            insertMediaDOM(media);
            likePhotographerMedia(totalLikes);
        });
    });
}

/**
 * 
 * @param {object} mediaByTitleAsc 
 * @param {number} totalLikes 
 */
function setMediaByTitleAsc(mediaByTitleAsc, totalLikes) {
    const mediaTitleAscElt = document.querySelector(".mediaTitleAsc");

    mediaTitleAscElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        mediaByTitleAsc.forEach(media => {
            insertMediaDOM(media);
            likePhotographerMedia(totalLikes);
        })
    });
}

/**
 * 
 * @param {object} photographer 
 * @param {object} photographerPopularMedia 
 * @param {object} mediaByDateDesc 
 * @param {object} mediaByTitleAsc 
 */
async function displayData(photographer, photographerPopularMedia, mediaByDateDesc, mediaByTitleAsc) {
    let totalLikes = getPhotographerTotalLikes(photographerPopularMedia);

    photographerPopularMedia.forEach(media => { insertMediaDOM(media) });
    likePhotographerMedia(totalLikes);
    setPhotographerPopularMedia(photographerPopularMedia, totalLikes);
    setMediaByDateDesc(mediaByDateDesc, totalLikes)
    setMediaByTitleAsc(mediaByTitleAsc, totalLikes);
    photographerContactFactory(photographer);
    photographerPriceAndTotalLikesFactory(photographer, totalLikes);
}

/**
 * 
 * @param {object} photographerPopularMedia 
 * @returns {object}
 */
function getPhotographerTotalLikes(photographerPopularMedia) {
    const likes = photographerPopularMedia.map(media => (media.likes));

    return likes.reduce((a, b) => a + b, 0);
}

/**
 * 
 * @param {object} photographer 
 * @returns {HTMLElement}
 */
async function displayContactForm(photographer) {
    const photographerContactFormModel = photographerContactFormFactory(photographer);
    const contactFormDOM = photographerContactFormModel.getUserContactFormDOM();

    return contactFormDOM;
}

/**
 * 
 * @param {object} photographerMedia 
 */
async function displayLightboxModal(photographerMedia) {
    photographerMedia.forEach(media => {
        photographerLightboxFactory(media);
    });
}

async function getPhotographerData() {
    const { photographers, media } = await getPhotographers();
    const photographer = getPhotographerByName(photographers);
    const photographerPopularMedia = getPhotographerMediaByPopular(media);
    const mediaByDateDesc = getPhotographerMediaByDateDesc(media);
    const mediaByTitleAsc = getPhotographerMediaByTitleAsc(media);
    const photographerMedia = getPhotographerMedia(media);

    displayData(photographer, photographerPopularMedia, mediaByDateDesc, mediaByTitleAsc);
    displayContactForm(photographer);
    displayLightboxModal(photographerMedia);
}

function turnChevronDropdownList() {
    let direction = false;

    selectDivElt.addEventListener("click", () => {
        if (direction == false) {
            selectDivElt.style.setProperty('--selectdivAfterTransform','rotate(-90deg)');
            direction = true;
        } else {
            selectDivElt.style.setProperty('--selectdivAfterTransform','rotate(90deg)');
            direction = false;
        }
    });
}

/**
 * 
 * @param {number} totalLikes
 */
function likePhotographerMedia(totalLikes) {
    const loveElts = document.querySelectorAll(".media i");
    const likesNumberElts = document.querySelectorAll(".media span");

    for (i = 0; i < loveElts.length; i++) {
        const loveElt = loveElts[i];
        const likesNumberElt = likesNumberElts[i];
        let likesNumber = likesNumberElt.textContent;

        let liked = true;
        loveElt.addEventListener("click", (event) => {
            const totalLikesElt = document.querySelector(".total-likes b");

            if (liked === true) {
                likesNumber++;
                totalLikes++;
                likesNumberElt.textContent = likesNumber;
                totalLikesElt.textContent = totalLikes;
                liked = false;
            } else {
                likesNumber--;
                totalLikes--;
                likesNumberElt.textContent = likesNumber;
                totalLikesElt.textContent = totalLikes;
                liked = true;
            }
            event.preventDefault();
        });
    }
}

getPhotographerData();
turnChevronDropdownList();

