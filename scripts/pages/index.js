import Api from"../API/api.js";
import PhotographeData from "../patterns/constructorPattern/photographeData.js";
import CardFactory from "../patterns/factoriesPattern/cardsFactory.js";
import { singletonMedia } from "../patterns/singletonPattern/SingletonMedia.js";
const photographersSection = document.querySelector(".photographer")
const photographerApi = new Api("./Fisheye.github.io/data/photographers.json");
/**
 * @description - Initialise la page d'accueil
 * @param {Array} photographersData - Tableau des photographes
 * @param {PhotographeData} photographer - Instance de la classe PhotographeData
 * @param {CardFactory} card - Instance de la classe CardFactory
 * @param {HTMLElement} photographerCard - Carte du photographe
 * @param {string} imgSrc - Source de l'image du photographe
 * @export {init}
 */
async function init  ()  {
    const photographersData = await photographerApi.get();
    const photographers =photographersData.photographers;
   
        photographers
            .map(photographer => new PhotographeData(photographer))
            .forEach(async photographer => {
                const card = new CardFactory(photographer);
                const photographerCard = card.createCardPhotographer();
                photographersSection.appendChild(photographerCard);
                
            // Charger l'image du photographe en utilisant le singleton
            const imgSrc = `${photographer._portrait}`;            
            try {
                const img = await singletonMedia.loadImage(imgSrc);
                photographerCard.querySelector('.photographer__link--thumbnail').src = img.src;
            } catch (error) {
                console.error('Erreur de chargement de l\'image:', error);
            }
            });
}
init();