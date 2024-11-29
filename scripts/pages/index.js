    import { fetchJsonData } from "../API/api";
    import { cardConstructor } from "../patterns/constructorPattern/cardsConstructor";
    import { cardFactory } from "../patterns/factoriesPattern/cardsFactory";

    async function getPhotographers() {
         
        //  requête sur le fichier JSON 
        const photographersData = await fetchJsonData('../API/api')
        // retourner les datas photographers une fois récupéré
        console.log(photographersData)
        return photographersData
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographerData) => {
            const photographer = new cardConstructor(photographerData);
            const cardFactories = new cardFactory();
            const card = cardFactory.createCard(photographer)
            photographersSection.appendChild(card);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
