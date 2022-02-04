async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const result = await fetch("../data/photographers.json");
    const res = await result.json();

    const photographers = res.photographers;

    photographers.forEach((photographer) => {
        photographer.medias = res.media.filter(
            (media) => media.photographerId === photographer.id
        );
    });

    console.log(photographers);
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

function init() {
    // Récupère les datas des photographes
    getPhotographers();
    /* displayData(photographers); */
}

init();
