// Récupérer les données du fichier JSON
async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const photographersData = await response.json();
    return photographersData.photographers;
}

// Disposer les photographes avec photographerFactory
async function displayPhotographers() {
    const photographers = await getPhotographers();
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Afficher les photographes à l'ouverture de la page
async function init() {
    const { photographers } = await getPhotographers();
    displayPhotographers(photographers);
};

init();
    
