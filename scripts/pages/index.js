    async function getPhotographers() {

        const photographersFetchingURL = '../../data/photographers.json';

        let response;
        try {
            response = await fetch(photographersFetchingURL)
        } catch {
            console.log("Erreur dans le code de requête des photographes")
        }

        if (response.ok) {
            results = await response.json()
        } else {
            console.log("Le réseau n'a pas renvoyé une bonne réponse")
        }


        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: results.photographers,
            media: results.media
        })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        const priceBasis = '€/jour';

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer, priceBasis);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
