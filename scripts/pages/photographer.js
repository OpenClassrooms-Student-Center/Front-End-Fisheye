//RECUPERATION DES DONNEES DES PHOTOGRAPHES
 async function getProfile() {
    const photographers = [
        {
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "MimiKeel.jpg"
        },
        {
            "name": "Ellie-Rose Wilkens",
            "id": 930,
            "city": "Paris",
            "country": "France",
            "tagline": "Capturer des compositions complexes",
            "price": 250,
            "portrait": "EllieRoseWilkens.jpg"
        },
        {
            "name": "Tracy Galindo",
            "id": 82,
            "city": "Montreal",
            "country": "Canada",
            "tagline": "Photographe freelance",
            "price": 500,
            "portrait": "TracyGalindo.jpg"
        },
        {
            "name": "Nabeel Bradford",
            "id": 527,
            "city": "Mexico City",
            "country": "Mexico",
            "tagline": "Toujours aller de l'avant",
            "price": 350,
            "portrait": "NabeelBradford.jpg"
        },
        {
            "name": "Rhode Dubois",
            "id": 925,
            "city": "Barcelona",
            "country": "Spain",
            "tagline": "Je crée des souvenirs",
            "price": 275,
            "portrait": "RhodeDubois.jpg"
        },
        {
            "name": "Marcel Nikolic",
            "id": 195,
            "city": "Berlin",
            "country": "Germany",
            "tagline": "Toujours à la recherche de LA photo",
            "price": 300,
            "portrait": "MarcelNikolic.jpg"
        }
    ] 

    fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
     //   console.log(data);
    })

    return ({photographers: [...photographers]}) 
}


//AFFICHAGE DES DONNEES VIA profileFactory
async function displayData(photographers) {
    const photographHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        //Verifie si l'url contient l'id du photographe
        let verifyUrl = new URLSearchParams(window.location.search);
        verifyUrl.has(photographer.id);
        let param = verifyUrl.get('id');
        //console.log(param);

        const lightboxModel = lightboxFactory(photographer);
			lightboxModel.getLightboxDOM();

        if (photographer.id == param) {
            const photographerModel = profileFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographHeader.appendChild(userCardDOM);

            const contactHeader = document.querySelector(".contact-header");
            const contactModel = contactFactory(photographer);
            const contactCardDOM = contactModel.getContactCardDOM();
            contactHeader.appendChild(contactCardDOM);

            
        }
    });
};

async function init() {
    const { photographers } = await getProfile();
    displayData(photographers);
};

init(); 
 

