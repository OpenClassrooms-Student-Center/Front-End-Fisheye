    import { fetchJsonData } from "../API/api";
    import { cardConstructor } from "../patterns/constructorPattern/cardsConstructor";
    import { cardsFactory } from "../patterns/factoriesPattern/cardsFactory";

    async function getPhotographers() {
         
        //  requête sur le fichier JSON 
        const photographersData = await fetchJsonData()
        // retourner les datas photographers une fois récupéré
        console.log(photographersData)
        return photographersData
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographerData) => {
            const photographer = new cardConstructor(photographerData);
            const cardsFactory = new cardsFactory();
            const card = cardsFactory.createCard(photographer)
            photographersSection.appendChild(card);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
