
async function fetchJSON(url, type) {
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch retourne un objet avec une propriété response qui si est à false signifie que la connection n'est pas bonne et donc on stop la fonction 
    if (!response.ok) { throw new Error("Thrown from fetchJSON()"); }

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
    try {
        const { photographers } = await getPhotographers();
        displayData(photographers);
        console.log("Page initialiser avec succès depuis init()");
    }
    catch (e) {
        console.error(e);
        console.log("Rediriger vers la page 404");
    }

};

init();
