import Api from "../API/api.js";
import PhotographeData from "../patterns/constructorPattern/photographeData.js";
import MediasFactory from "../patterns/factoriesPattern/MediasFactory.js";
import PhotographerPageHeader from "../patterns/factoriesPattern/photographerPageHeaderFactory.js";
import PhotographerPageMedia from "../patterns/factoriesPattern/photographerPageMediaFactory.js";   
import {openModal, closeModal, sendForm} from "../utils/contactForm.js";
import {openCloseFilterMenu, displayMediaWithFilter} from "../utils/filter.js";
import {afficheTotalLikes} from "../utils/likes.js"; 
import {displayLightbox} from "../utils/lightbox.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");
/**
 * @description - Récupère les données du photographe et des médias
 * @param {number} photographerId - Id du photographe
 * @param {Array} photographers - Tableau des photographes
 * @param {Array} media - Tableau des médias
 * @param {Object} photographer - Données du photographe
 * @param {Object} medias - Données des médias
 * @param {PhotographeData} photographer - Instance de la classe PhotographeData
 * @param {MediasFactory} medias - Instance de la classe MediasFactory
 * @export {getPhotographerById}
 * @returns {Promise<{photographer: PhotographeData, medias: MediasFactory[]}>}
 */
export async function getPhotographerById() {
    const { photographers, media } = await photographersApi.get();
    
    const photographer = photographers
      
        .map(photographer => new PhotographeData(photographer))
        .find(photographer => photographer._id == photographerId);
        
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media._photographerId == photographerId);
    
    return { photographer, medias };
};
/**
 * @description - Affiche la page du photographe
 * @export {displayPhotographerPage}
 */

async function  displayPhotographerPage  ()  {
    const { photographer, medias } = await getPhotographerById();

    const header = new PhotographerPageHeader(photographer);
    const media = new PhotographerPageMedia(photographer, medias);

    header.createPhotographerHeader();
    media.createPhotographerMedia();
    
        afficheTotalLikes();
        openModal(photographer);
        closeModal();        
        sendForm();
        openCloseFilterMenu();
        displayMediaWithFilter(media);
        displayLightbox(media);
                            
}
      
    displayPhotographerPage();