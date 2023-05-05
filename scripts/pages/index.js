    import { photographerFactory } from "../factories/photographer.js";
    
    async function getPhotographers() {
        // récupération des données du fichier JSON permettant d'aficher les photographes avec la méthode fetch
        const response = await fetch("../../data/photographers.json");
        const data = await response.json();
        const photographers = data.photographers;
        
        // et bien retourner le tableau photographers seulement une fois récupéré
        return  photographers;
    }

    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
