async function getPhotographers() {
    //l'accès le fichier json
    const data = await fetch("../data/photographers.json")
    const json = await data.json();
    return ({
        //pour l'accès a tableau 
        photographers: json.photographers
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const userCardDOM = new PhotographerFactory(photographer, 'cardDOM');
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
