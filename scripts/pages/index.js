    // importation de la fonction "photographerFactory" depuis le fichier "../factories/photographer.js
    import { photographerFactory } from "../factories/photographer.js";
    
    //Focntion asynchrone qui récupère les données des photographes
    async function getPhotographers() {
            // Effectue une requête pour récupérer les données des photographes à partir de photographers.json
            const response = await fetch('../../data/photographers.json');
            // Transforme la réponse au format JSON en objet JavaScript
            const data = await response.json();
            // Extrait les données des photographes
            const photographers = data.photographers; 
            // Retourne les données des photographes
            return photographers;    
    }

    // Fonction qui affiche les données des photographes
    function displayData(photographers) {
        // Sélectionne la section HTML avec la classe "photographer_section"
        const photographersSection = document.querySelector(".photographer_section");

        // Parcours les données des photographes
        photographers.forEach((photographer) => {
            // Crée un modèle de photographe à partir des données du photographe
            const photographerModel = photographerFactory(photographer);
            // Obtient la représentation DOM de la carte utilisateur du photographe
            const userCardDOM = photographerModel.getUserCardDOM();
            // Ajoute la carte utilisateur du photographe à la section des photographes
            photographersSection.appendChild(userCardDOM);
        });
    };


    async function init() {
        // Récupère les datas des photographes
        const  photographers  = await getPhotographers();
        // Affiche les données des photographes en appelant la fonction 'displayData'
        displayData(photographers);
    };
    
    // Appelle la fonction init
    init();
    
