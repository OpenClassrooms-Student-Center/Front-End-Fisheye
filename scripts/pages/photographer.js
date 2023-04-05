"use_strict";

const selectDivElt = document.querySelector(".dropdown-label");
const ulMediaElt = document.querySelector(".media ul");

async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = response.json();

    return photographers;
}

function getPhotographerByName(photographers) {
    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');

    return photographers.filter((photographerByName) => { 
        return photographerByName.name == name 
    });
}

function getPhotographerMedia(media) {
    const query = window.location.search;
    const id = new URLSearchParams(query).get('id');

    return media.filter((media) => { 
        return media.photographerId == id 
    })
}

function getPhotographerMediaByPopular(media) {
    const photographerMedia = getPhotographerMedia(media);

    return photographerMedia.sort(function(a,b) { 
        return b.likes - a.likes 
    });
}

function getPhotographerMediaByDateDesc(media) {
    const photographerMedia = getPhotographerMedia(media);

    return photographerMedia.sort(function(a,b) { 
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
    });
}

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

function insertMediaDOM(media) {
    const photographerMediaModel = photographerMediaFactory(media);
    const mediaCardDOM = photographerMediaModel.getMediaCardDOM();
    ulMediaElt.appendChild(mediaCardDOM);
}

function setPhotographerPopularMedia(photographerPopularMedia) {
    const mediaByPopularElt = document.querySelector(".dropdown-label");

    mediaByPopularElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        photographerPopularMedia.forEach(media => {
            insertMediaDOM(media);
        })
    });
}

function setMediaByDateDesc(mediaByDateDesc) {
    const mediaDateDescElt = document.querySelector(".mediaDateDesc");

    mediaDateDescElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        mediaByDateDesc.forEach(media => {
            insertMediaDOM(media);
        });
    });
}

function setMediaByTitleAsc(mediaByTitleAsc) {
    const mediaTitleAscElt = document.querySelector(".mediaTitleAsc");

    mediaTitleAscElt.addEventListener("click", () => {
        ulMediaElt.innerHTML = "";
        mediaByTitleAsc.forEach(media => {
            insertMediaDOM(media);
        })
    });
}

async function displayData(photographer, photographerPopularMedia, mediaByDateDesc, mediaByTitleAsc) {
    let totalLikes = getPhotographerTotalLikes(photographerPopularMedia);

    photographerPopularMedia.forEach(media => { insertMediaDOM(media) });
    setPhotographerPopularMedia(photographerPopularMedia);
    setMediaByDateDesc(mediaByDateDesc)
    setMediaByTitleAsc(mediaByTitleAsc);
    photographerContactFactory(photographer);
    likePhotographerMedia();
    photographerPriceAndTotalLikesFactory(photographer, totalLikes);
}

function getPhotographerTotalLikes(photographerPopularMedia) {
    const likes = photographerPopularMedia.map(media => (media.likes));

    return likes.reduce((a, b) => a + b, 0);
}

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

function likePhotographerMedia() {
    const loveElts = document.querySelectorAll(".media i");
    const likesNumberElts = document.querySelectorAll(".media span");

    for (i = 0; i < loveElts.length; i++) {
        const loveElt = loveElts[i];
        const likesNumberElt = likesNumberElts[i];
        let likesNumber = likesNumberElts[i].textContent;
        let liked = false;
        
        loveElt.addEventListener("click", () => {
            if (liked === false) {
                likesNumberElt.textContent = likesNumber ++;
                liked = true;
            } else {
                likesNumberElt.textContent = likesNumber --;
                liked = false;
            }
        });
    }
}

getPhotographerData();
turnChevronDropdownList();

