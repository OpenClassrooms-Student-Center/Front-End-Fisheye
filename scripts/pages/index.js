async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const photographersData = await response.json();
    return photographersData.photographers;
}

async function displayPhotographers() {
    const photographers = await getPhotographers();
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayPhotographers(photographers);
};

init();
    
