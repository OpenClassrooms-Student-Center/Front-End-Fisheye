"use_strict";

/**
 * 
 * @returns {object} - return photographers data
 */
async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const photographers = response.json();

    return photographers;
}

/**
 * 
 * @param {object} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector("main");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
