async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const res = await (await fetch("../../data/photographers.json")).json();

    const photographers = res.photographers;

    photographers.forEach((photographer) => {
        photographer.medias = res.media.filter(
            (media) => media.photographerId === photographer.id
        );
    });

    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes

    const photographers = await getPhotographers();
    displayData(photographers);
}

init();
