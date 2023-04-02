"use_strict";
const selectDivElt = document.querySelector(".selectdiv");

// get photographers
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = response.json();

    return photographers;
}

function getPhotographer(query, photographers) {
    const name = new URLSearchParams(query).get('name');

    return photographers.filter((photographerByName) => { 
        return photographerByName.name == name 
    });
}

function getPhotographerPopularMedia(query, media) {
    const id = new URLSearchParams(query).get('id');

    return media.filter((media) => { 
        return media.photographerId == id 
    }).sort(function(a,b) { 
        return b.likes - a.likes 
    });
}

async function displayData(photographer, photographerPopularMedia) {
    photographerContactFactory(photographer);

    const ulMediaElt = document.querySelector(".media ul");
    photographerPopularMedia.forEach(media => {
        const photographerMediaModel = photographerMediaFactory(media);
        const mediaCardDOM = photographerMediaModel.getMediaCardDOM();
        ulMediaElt.appendChild(mediaCardDOM);
    });

    likePhotographerMedia();
}

async function displayContactForm(photographer) {
    const photographerContactFormModel = photographerContactFormFactory(photographer);
    const contactFormDOM = photographerContactFormModel.getUserContactFormDOM();

    return contactFormDOM;
}

// get photographerData
async function getPhotographerData() {
    const { photographers, media } = await getPhotographers();
    const query = window.location.search;
    const photographer = getPhotographer(query, photographers);
    const photographerPopularMedia = getPhotographerPopularMedia(query, media);

    displayData(photographer, photographerPopularMedia);
    displayContactForm(photographer);
}

// turn chevron dropdown list
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

// like photographer media
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