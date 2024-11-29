import Api from"../API/api.js";
import cardsConstructor from "../patterns/constructorsPattern/cardsConstructor.js";
import cardFactory from "../patterns/factoriesPattern/cardsFactory.js";

const photographersSection = document.querySelector(".photographer-section")
const photographerApi = new Api("../../data/photographers.json");

const init = async () => {
    const photographersData = await photographerApi.getPhotographers();
    const photographers =photographersData.cardsConstructor;
    
        photographers
            .map(photographer => new cardsConstructor(photographer))
            .forEach(photographer => {
                const card = new cardFactory(photographer);
                const photographerCard = card.createCardPhotographer();
                photographersSection.appendChild(photographerCard);
            });
}
init();