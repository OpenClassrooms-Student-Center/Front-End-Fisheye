import Api from"../API/api.js";
import photographeData from "../patterns/constructorPattern/photographeData.js";
import cardFactory from "../patterns/factoriesPattern/cardsFactory.js";

const photographersSection = document.querySelector(".photographer")
const photographerApi = new Api("../../data/photographers.json");

const init = async () => {
    const photographersData = await photographerApi.get();
    const photographers =photographersData.photographers;

        photographers
            .map(photographer => new photographeData(photographer))
            .forEach(photographer => {
                const card = new cardFactory(photographer);
                const photographerCard = card.createCardPhotographer();
                photographersSection.appendChild(photographerCard);
            });
}
init();