async function getPhotographers() {
    try {
        // URL du fichier JSON
        const response = await fetch("../../data/photographers.json");
        if (!response.ok) {
            throw new Error('Failed to fecth data');
        }
        const data = await response.json();

        // Retourne le tableau des photographes une fois récupéré
        return data;
    } catch (error) {
        console.error('Error fetching photographers data', error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();