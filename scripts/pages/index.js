init();

async function init() {
    // Récupere les datas du Json
    const {liste}  = await getPhotographers();
    await displayData(liste);
}

async function getPhotographers() {
    //Récuperer le json
    let liste = [];
    try {
        let response = await fetch("./data/photographers.json");
        let data = await response.json();
        liste = data.photographers;
    } catch (error) {
        console.error(error);
    }

    // Creer un objet avec les photographes et les médias
    return ({liste});
}

// Appel de l'affichage l'affichage des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // Ajout des photographes sur la page
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}