//Mettre le code JavaScript lié à la page photographer.html ici.
import { photographerFactory } from "../factories/photographer.js";
// import { mediaFactory } from "../factories/mediaFactory.js";
let mediaPhotographer = [];
async function dataPhotographer(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
};

const foundPhotographer = (photographers, id) =>{
    const photographer = photographers.find(photographer => photographer.id === id);
    return photographer;
};



const foundMedia = (media, id) =>{
    const mediaPhotographer = media.filter(media => media.photographerId === id);
    return mediaPhotographer;
};

function header(photographer){
    const factoryPhotographer = photographerFactory(photographer);
    const photographHeader = document.querySelector(".photograph-header");
    const photographerDOM = factoryPhotographer.getPhotographerDOM();
    const {div, img} = photographerDOM;
    const boutonContact = document.querySelector(".contact_button");
    photographHeader.insertBefore(div, boutonContact);
    photographHeader.insertBefore(img, boutonContact.nextSibling);
    const modalContact = document.getElementById("contact_modal");
    modalContact.setAttribute("aria-label", `Contactez-moi ${photographer.name}`);
}





async function init(){
    const data = await dataPhotographer('../../data/photographers.json');
    const {photographers, media} = data;

    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = parseInt(urlParams.get('id'));

    const photographer = foundPhotographer(photographers, idPhotographer);
    const photographerName = document.querySelector(".photographerName");
    photographerName.textContent = photographer.name;
    
    mediaPhotographer = foundMedia(media, idPhotographer);
    
    header(photographer);
    foundMedia(media, idPhotographer);
    foundPhotographer(photographers, idPhotographer);
    
};

init();
