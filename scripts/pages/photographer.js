"use_strict";

const filterLabelElt = document.querySelector(".dropdown-label");
const ulMediaElt = document.querySelector(".media ul");
const mediaByPopularElt = document.querySelector(".popularMedia");
const mediaDateDescElt = document.querySelector(".mediaDateDesc");
const mediaTitleAscElt = document.querySelector(".mediaTitleAsc");

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
 * @param {object} hrElt 
 * @param {object} photographerMedia 
 * @param {number} totalLikes 
 * @param {object} totalLikesElt
 * @param {string} criteria 
 */
function filterMediaByCriteria(hrElt, photographerMedia, totalLikes, totalLikesElt, criteria) {
    clickFilterHandler(criteria);
    hrElt.style.display = "none";

    ulMediaElt.innerHTML = "";
    photographerMedia.forEach(media => {
        insertMediaDOM(media);
        likePhotographerMedia(totalLikes, totalLikesElt);
        totalLikesElt.textContent = totalLikes;
    });
}

/**
 * 
 * @param {string} filterName 
 */
function clickFilterHandler(filterName) {
    const unclickedFilters = document.querySelectorAll(".dropdown-ul li");

    unclickedFilters.forEach((filter) => {
        if (filter.textContent === filterName) {
            filterLabelElt.textContent = filter.textContent;
            filter.style.display = "none";
        } else {
            filter.style.display = "block";
        }
    });
}

/**
 * 
 * @param {object} photographerPopularMedia 
 * @param {object} totalLikes
 */
function setPhotographerPopularMedia(photographerPopularMedia, totalLikes, totalLikesElt) {
    const hrPopularElt = document.querySelector(".dropdown-ul li:nth-child(1)");
    filterLabelElt.textContent = mediaByPopularElt.textContent;
    mediaByPopularElt.style.display = "none";

    const criteria = "Popularité";
    mediaByPopularElt.addEventListener("click", () => {
        filterMediaByCriteria(hrPopularElt, photographerPopularMedia, totalLikes, totalLikesElt, criteria);
    });

    mediaByPopularElt.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "enter") {
            filterMediaByCriteria(hrPopularElt, photographerPopularMedia, totalLikes, totalLikesElt, criteria);
        }
    });
}

/**
 * 
 * @param {object} mediaByDateDesc 
 * @param {number} totalLikes
 */
function setMediaByDateDesc(mediaByDateDesc, totalLikes, totalLikesElt) {
    const hrDateElt = document.querySelector(".dropdown-ul li:nth-child(3)");
    const criteria = "Date";
    
    mediaDateDescElt.addEventListener("click", () => {
        filterMediaByCriteria(hrDateElt, mediaByDateDesc, totalLikes, totalLikesElt, criteria);
    });

    mediaDateDescElt.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "enter") {
            filterMediaByCriteria(hrDateElt, mediaByDateDesc, totalLikes, totalLikesElt, criteria);
        }
    });
}

/**
 * 
 * @param {object} mediaByTitleAsc
 * @param {number} totalLikes 
 */
function setMediaByTitleAsc(mediaByTitleAsc, totalLikes, totalLikesElt) {
    const hrTitleElt = document.querySelector(".dropdown-ul li:nth-child(5)");
    const criteria = "Titre";

    mediaTitleAscElt.addEventListener("click", () => {
        filterMediaByCriteria(hrTitleElt, mediaByTitleAsc, totalLikes, totalLikesElt, criteria);
    });

    mediaTitleAscElt.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "enter") {
            filterMediaByCriteria(hrTitleElt, mediaByTitleAsc, totalLikes, totalLikesElt, criteria);
        }
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
    photographerContactFactory(photographer);
    photographerPriceAndTotalLikesFactory(photographer, totalLikes);
    
    const totalLikesElt = document.querySelector(".total-likes b");
    likePhotographerMedia(totalLikes, totalLikesElt);
    setPhotographerPopularMedia(photographerPopularMedia, totalLikes, totalLikesElt);
    setMediaByDateDesc(mediaByDateDesc, totalLikes, totalLikesElt);
    setMediaByTitleAsc(mediaByTitleAsc, totalLikes, totalLikesElt);
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
 * @returns {object}
 */
async function displayContactForm(photographer) {
    const photographerContactFormModel = photographerContactFormFactory(photographer);
    const contactFormDOM = photographerContactFormModel.getUserContactFormDOM();

    return contactFormDOM;
}

async function getPhotographerData() {
    const { photographers, media } = await getPhotographers();
    const photographer = getPhotographerByName(photographers);
    const photographerPopularMedia = getPhotographerMediaByPopular(media);
    const mediaByDateDesc = getPhotographerMediaByDateDesc(media);
    const mediaByTitleAsc = getPhotographerMediaByTitleAsc(media);

    displayData(photographer, photographerPopularMedia, mediaByDateDesc, mediaByTitleAsc);
    displayContactForm(photographer);
}

/**
 * 
 * @param {number} totalLikes 
 * @param {object} totalLikesElt 
 */
function likePhotographerMedia(totalLikes, totalLikesElt) {
    const loveElts = document.querySelectorAll(".btn-like-media");
    const likesNumberElts = document.querySelectorAll(".media b");

    for (let i = 0; i < loveElts.length; i++) {
        const loveElt = loveElts[i];
        const likesNumberElt = likesNumberElts[i];
        let likesNumber = likesNumberElt.textContent;

        let liked = true;
        // like or dislike media onclick mouse
        loveElt.addEventListener("click", () => {
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
        });

        // like or dislike media on keydown enter button keyboard
        loveElt.addEventListener("keydown", (event) => {
            if (event.key.toLowerCase() === "enter") {
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
            }
        });
    }
}

getPhotographerData();