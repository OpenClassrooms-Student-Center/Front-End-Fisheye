/**
 * Récupére la liste de tous les photographes à partir du fichier json
 * @returns 
 */
async function getPhotographers() {
    const data = await fetch("data/photographers.json")
    const json = await data.json();

    return ({
        photographers: json.photographers
    })
}

/**
 * Affiche la liste des photographes
 * @param {*} photographers 
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = new PhotographerFactory(photographer, 'card');
        photographersSection.appendChild(userCardDOM);
    });
};

/**
 * Initialisation de la page
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
