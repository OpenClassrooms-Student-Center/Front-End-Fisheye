    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = []; // On crée un tableau vide pour les photographes

        // On appel les data/photographers.json dans un fetch
        // On récupère les données du fichier json
        const response = await fetch("data/photographers.json");
        photographers = await response.json();

        console.log(photographers);

        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers : photographers.photographers // On retourne le tableau photographers
        });
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
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
    
