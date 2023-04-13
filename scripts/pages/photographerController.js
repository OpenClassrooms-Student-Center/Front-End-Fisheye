// import { mediaFactory } from "../factories/mediaFactory.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { Lightbox } from "../factories/lightboxFactory.js";
import { PhotographersModel } from "../models/photographersModel.js";

console.log("Window location:", window.location)
export let userId = (new URL(window.location)).searchParams.get("id");


const photographersModel = new PhotographersModel('data/photographers.json');
export const parentDOM = document.querySelector("main");

const photographer = await photographersModel.getPhotographerById(userId);
export const mediaArrayById = await photographersModel.getMediaForOnePhotographer(userId);

// const test = mediaArrayById.map(media => media.price)


// FONCTION BANNER PHOTOGRAPHE
async function bannerData() {
    const photographerModel = photographerFactory(photographer);
    const userBannerDOM = photographerModel.getUserBannerDOM();
    parentDOM.appendChild(userBannerDOM);
};

// FONCTION SORT MEDIA
async function mediaSort() {
    const sort = mediaFactory(mediaArrayById);   
    const photographerFilterDOM = sort.getUserMediaSortDOM();
    parentDOM.appendChild(photographerFilterDOM);
}

// FONCTION GALERIE MEDIAS PHOTOGRAPHE
async function mediaData(mediaArrayById) {
    const photographiesSection = document.createElement('section')
    photographiesSection.classList.add('photographies_section')
    mediaArrayById.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photographerMediaDOM = mediaModel.getUserMediaDOM();
        parentDOM.appendChild(photographiesSection);
        photographiesSection.appendChild(photographerMediaDOM);

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


async function init() {
    // console.log("Window location:", window.location)

    // let userId = (new URL(window.location)).searchParams.get("id");

    // let photographer = await photographersModel.getPhotographerById(userId);
    // const mediaArrayById = [];

    // mediaArrayById.push(photographersModel.getMediaForOnePhotographer(userId))

    // Récupère les datas des photographes et créé la bannière
    bannerData(photographer);
    mediaSort();
    mediaData(mediaArrayById);
    likePriceData(mediaArrayById);
    formData(photographer);
    Lightbox.init()
};
init();