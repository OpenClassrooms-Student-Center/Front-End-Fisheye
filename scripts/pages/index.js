import Api from"../API/api.js";
import photographeData from "../patterns/constructorPattern/photographeData.js";
import cardFactory from "../patterns/factoriesPattern/cardsFactory.js";
import { singletonMedia } from "../patterns/singletonPattern/SingletonMedia.js";
const photographersSection = document.querySelector(".photographer")
const photographerApi = new Api("../../data/photographers.json");

const init = async () => {
    const photographersData = await photographerApi.get();
    const photographers =photographersData.photographers;

        photographers
            .map(photographer => new photographeData(photographer))
            .forEach(async photographer => {
                const card = new cardFactory(photographer);
                const photographerCard = card.createCardPhotographer();
                photographersSection.appendChild(photographerCard);
                
            // Charger l'image du photographe en utilisant le singleton
            const imgSrc = `${photographer._portrait}`;            
            try {
                const img = await singletonMedia.loadImage(imgSrc);
                photographerCard.querySelector('.photographer_thumbnail').src = img.src;
            } catch (error) {
                console.error('Erreur de chargement de l\'image:', error);
            }
            });
}
init();