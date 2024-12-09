import Api from "../API/api.js";
import photographeData from "../patterns/constructorPattern/photographeData.js";
import MediasFactory from "../patterns/factoriesPattern/MediasFactory.js";
import photographerPageHeader from "../patterns/factoriesPattern/photographerPageHeaderFactory.js";
import photographerPageMedia from "../patterns/factoriesPattern/photographerPageMediaFactory.js";   
import {closeModal} from "../utils/contactForm.js";
import {openModal} from "../utils/contactForm.js";
import {openCloseFilterMenu} from "../utils/filter.js";
import {afficheTotalLikes} from "../utils/likes.js"; 
import {displayMediaWithFilter} from "../utils/filter.js";
import {displayLightbox} from "../utils/lightbox.js";

const photographersApi = new Api("../../data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");


export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    
    const photographer = photographers
    
        .map(photographer => new photographeData(photographer))
        .find(photographer => photographer._id == photographerId);
        
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media._photographerId == photographerId);
    
    return { photographer, medias };
};

const displayPhotographerPage = async () => {
    const { photographer, medias } = await getPhotographerById();

    const header = new photographerPageHeader(photographer);
    const media = new photographerPageMedia(photographer, medias);

    header.createPhotographerHeader();
    media.createPhotographerMedia();
    
        afficheTotalLikes();
        closeModal();
        openModal();
        openCloseFilterMenu();
        displayMediaWithFilter(media);
        displayLightbox(media);
        
        
    
}

displayPhotographerPage();
