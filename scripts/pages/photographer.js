"use_strict";

// get photographers
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    const photographers = response.json();

    return photographers;
}

// get photographer
async function getPhotographer() {
    const { photographers, media } = await getPhotographers();
    
    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');
    const id = new URLSearchParams(query).get('id');

    const photographerMedia = media.filter((media) => {
        return media.photographerId == id;
    });

    const photographerPopularMedia = photographerMedia.sort(function(a,b) {
        return b.likes - a.likes;
    })

    const photographer = photographers.filter((photographer) => {
        return photographer.name == name;
    });
   
    displayData(photographer, photographerPopularMedia);
}

async function displayData(photographer, photographerMedia) {
    photographerFactory(photographer);
    photographerMediaFactory(photographerMedia);
}

getPhotographer();

