import { photographerFactory } from "../factories/photographerFactory.js";
import { Lightbox } from "../factories/lightboxFactory.js";
import { PhotographersModel } from "../models/photographersModel.js";

export const parentDOM = document.querySelector("main");
export const urlPhotographerId = (new URL(window.location)).searchParams.get("id");

const PhotographersModelContsructor = new PhotographersModel('data/photographers.json');
const photographer = await PhotographersModelContsructor.getPhotographerById(urlPhotographerId);
export const mediaPhotographer = await PhotographersModelContsructor.getMediaForOnePhotographer(urlPhotographerId);

const mediaDataContainer = document.querySelector(".photographer-media-container")
const filterContainer = document.querySelector(".photographer-filter-container")
const bannerContainer = document.querySelector(".photographer-banner-container")


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function init() {
    // Récupère les datas des photographes et créé la bannière
    bannerData(photographer);
    
    likePriceData(mediaPhotographer);
    formData(photographer);
    
    mediaData(mediaPhotographer);
    mediaSort(mediaPhotographer);

    Lightbox.init()
};

init();

// FONCTION BANNER PHOTOGRAPHE
async function bannerData(data) {
    const photographerModel = photographerFactory(data);
    const userBannerDOM = photographerModel.getUserBannerDOM();
    bannerContainer.appendChild(userBannerDOM);
};

// FONCTION SORT MEDIA
async function mediaSort(data) {
    const photographerFilterDOM = mediaFactory(data).getUserMediaSortDOM();
    filterContainer.appendChild(photographerFilterDOM);
}

// FONCTION GALERIE MEDIAS PHOTOGRAPHE
export async function mediaData(data) {
    mediaDataContainer.innerHTML = "";
    data.forEach((media) => {
        const mediaModel = mediaFactory(media).getUserMediaDOM();
        mediaDataContainer.appendChild(mediaModel);
    });
}




// FONCTION ENCARD PRIX PHOTOGRAPHE
async function likePriceData(mediaArrayById) {
    const photographerPrice = photographerFactory(photographer);
    const userPriceDOM = photographerPrice.getLikesPrice();
    parentDOM.appendChild(userPriceDOM);
};

// FONCTION MODAL FORM
function formData() {
    const formGen = contactForm(photographer);
    const formDOM = formGen.getContactFormDOM();
    parentDOM.appendChild(formDOM);
};

