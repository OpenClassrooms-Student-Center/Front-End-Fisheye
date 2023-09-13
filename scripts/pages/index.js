/**
 * Récupération des photographes depuis le fichier JSON
 */
async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const photographers = await reponse.json();

    return photographers;
}

/** 
 * Affichage des photographes 
*/
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

/**
 * Récupère les données des photographes
 */
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

