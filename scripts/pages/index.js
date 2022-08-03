async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers = [
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ]


    const url = './data/photographers.json'; // Data source .JSON 
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch retourne un objet avec une propriété response qui si est à false signifie que la connection n'est pas bonne 
    if (!response.ok) { throw new Error('fetch failed url not working') }

    
    const jsonResponse = await response.json(); // Lecture du body & parse en JSON

    console.log(photographers);
    console.log(jsonResponse.map);
    return { photographers }



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
