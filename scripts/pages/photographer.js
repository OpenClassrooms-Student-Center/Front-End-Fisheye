"use_strict";

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
    photographerMediaFactory(photographerPopularMedia);
}

async function displayContactForm(photographerName) {
    const photographerContactFormModel = photographerContactFormFactory(photographerName);
    const contactFormDOM = photographerContactFormModel.getUserContactFormDOM();

    return contactFormDOM;
}

// get photographerData
async function getPhotographerData() {
    const { photographers, media } = await getPhotographers();
    const query = window.location.search;
    const photographer = getPhotographer(query, photographers);
    const photographerPopularMedia = getPhotographerPopularMedia(query, media);
    const photographerName = getPhotographer(query, photographers);

    displayData(photographer, photographerPopularMedia);
    displayContactForm(photographerName);
}

getPhotographerData();

