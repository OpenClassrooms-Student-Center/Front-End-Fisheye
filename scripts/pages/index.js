
async function fetchJSON(url, type) {
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch retourne un objet avec une propriété response qui si est à false signifie que la connection n'est pas bonne et donc on stop la fonction 
    if (!response.ok) { throw new Error('fetch failed url not working') }

    let jsonResponse = await response.json(); // parse en JSON de la response
    jsonResponse = jsonResponse[type]; // Récuperers les data du tableau en question
    return jsonResponse;
}

async function getPhotographers() {
    const url = './data/photographers.json'; // Data source .JSON 
    photographers = await fetchJSON(url, 'photographers');
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
    const { photographers } = await getPhotographers().catch(error => console.log("error gerer page 404"));
    displayData(photographers);
};

init();
