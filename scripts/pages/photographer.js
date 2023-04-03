"use_strict";

const selectDivElt = document.querySelector(".selectdiv");

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

async function displayData(photographer, photographerPopularMedia) {
    const ulMediaElt = document.querySelector(".media ul");
    let totalLikes = getPhotographerTotalLikes(photographerPopularMedia);

    photographerPopularMedia.forEach(media => {
        const photographerMediaModel = photographerMediaFactory(media);
        const mediaCardDOM = photographerMediaModel.getMediaCardDOM();
        ulMediaElt.appendChild(mediaCardDOM);
    });
    
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

    displayData(photographer, photographerPopularMedia);
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