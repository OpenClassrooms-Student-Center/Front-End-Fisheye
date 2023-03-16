"use_strict";

// get photographers
async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const photographers = response.json();

    return photographers;
}

async function getPhotographer() {
    const { photographers } = await getPhotographers();

    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');

    const photographer = photographers.filter(function(photographer) {
        return photographer.name == name;
    });
    
    return photographer;
}

getPhotographer();



