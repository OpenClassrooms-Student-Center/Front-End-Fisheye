async function getPhotographers() {

    const url = './data/photographers.json'; // Data source .JSON 
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch retourne un objet avec une propriété response qui si est à false signifie que la connection n'est pas bonne et donc on stop la fonction 
    if (!response.ok) { throw new Error('fetch failed url not working') }

    let jsonResponse = await response.json(); // parse en JSON de la response
    photographers = jsonResponse['photographers']; // Récuperers les data du tableau Photographers

    return { photographers } // Return les data de PhotoGraphers
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        console.log(photographer);
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    await getPhotographers().catch(error => console.log("error gerer page 404"));
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
