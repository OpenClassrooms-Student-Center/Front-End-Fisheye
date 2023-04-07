import { mediaFactory } from "../factories/mediaFactory.js";
import { Lightbox } from "../factories/lightboxFactory.js";
console.log("Window location:", window.location)

// RECUPERATION DES PARAM URL
let params = (new URL(window.location)).searchParams;
let id = params.get("id");
console.log("id:", id)

// FETCH DES DONNÉES PHOTOGRAPHES
let page = await fetch(`data/photographers.json`)
.then(r => r.json())
// CIBLE LES DATA DES PHOTOGRAPHES 
const pagePhotographe = page.photographers;
    // Selection du photographe par son ID
export const photographeSelectedById = pagePhotographe.find((element) => element.id == id);

//SELECTION DES MEDIAS ET DE LEURS DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE
const mediasPhotographes = page.media;

export const mediaSelectedById = [];
mediasPhotographes.forEach(element => {
    if(element.photographerId == id) {
        mediaSelectedById.push(element)
    }
})

console.log(mediaSelectedById[1].title)
// SELECTION PARENT DOM 
export const parentDOM = document.querySelector("main");

// FONCTION BANNER PHOTOGRAPHE
async function bannerData() {
    const photographerModel = photographerFactory(photographeSelectedById);
    const userBannerDOM = photographerModel.getUserBannerDOM();
    parentDOM.appendChild(userBannerDOM);
};

// FONCTION FILTRE MEDIA
async function filterData() {
    const filter = photographerFactory(photographeSelectedById);
    const photographerFilterDOM= filter.getUserMediaFilterDOM();
    parentDOM.appendChild(photographerFilterDOM);
}

// FONCTION GALERIE MEDIAS PHOTOGRAPHE
async function mediaData(mediaSelectedById) {
    const photographiesSection = document.createElement('section')
    photographiesSection.classList.add('photographies_section')
    mediaSelectedById.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photographerMediaDOM= mediaModel.getUserMediaDOM();
        parentDOM.appendChild(photographiesSection);
        photographiesSection.appendChild(photographerMediaDOM);
    });    
}

// FONCTION ENCARD PRIX PHOTOGRAPHE
async function likePriceData(mediaSelectedById) {
    const photographerPrice = mediaFactory(mediaSelectedById);
    const userPriceDOM = photographerPrice.getLikesPrice();
    parentDOM.appendChild(userPriceDOM);
};

// FONCTION MODAL FORM
function formData() {
    const formGen = contactForm(photographeSelectedById);
    const formDOM = formGen.getContactFormDOM();
    parentDOM.appendChild(formDOM);
};


async function init() {
    // Récupère les datas des photographes et créé la bannière
    bannerData(photographeSelectedById);
    filterData();
    mediaData(mediaSelectedById);
    likePriceData(mediaSelectedById);
    formData(photographeSelectedById);
    Lightbox.init()
};

init();