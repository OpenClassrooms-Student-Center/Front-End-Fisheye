async function getPhotographers() {
    //la réponse attend le retour du fetch du fichier contenant les photographes
    await fetch('./data/photographers.json')
        .then((res) => res.json()) //les données attendent la réponse au format JSON
        .then((data) => { //on retrouve dans les données les différents objets et on passe "photographers" à la fonction displayData
            photographers = data.photographers;
            media = data.media;
            displayData(photographers);
        })
    }

    async function displayData(photographers) {

        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    getPhotographers()
