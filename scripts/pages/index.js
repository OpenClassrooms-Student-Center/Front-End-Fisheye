/**
 * This file is used to manage the index page.
 */

import {photographerFactory} from "../factories/photographer.js";

/**
 * Returns data from photographers
 * @returns 
 */
async function getPhotographers() {
    let response = fetch("../../data/photographers.json");
    let data = await (await response).json();

    // Penser à remplacer par les données récupérées dans le json
    const photographers = data.photographers;
    // et bien retourner le tableau photographers seulement une fois

    return ({
        photographers: [...photographers]
    })
}

/**
 * Displays the different photographer.
 * @param {*} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

/**
 * Initialize data.
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
