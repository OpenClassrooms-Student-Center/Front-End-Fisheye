"use_strict";

// get photographers
async function getPhotographers() {
    const response = await fetch("../data/photographers.json");
    const photographers = response.json();

    return photographers;
}

// get photographer
async function getPhotographer() {
    const { photographers } = await getPhotographers();

    const query = window.location.search;
    const name = new URLSearchParams(query).get('name');
    const photographer  = photographers.filter((photographer) => {
        return photographer.name == name;
    });

    displayData(photographer);
}

async function displayData(photographer) {
    photographerPageFactory(photographer);
}

getPhotographer();

