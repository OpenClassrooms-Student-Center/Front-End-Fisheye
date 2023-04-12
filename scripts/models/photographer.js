import { mediaFactory } from "../factories/mediaFactory.js";
import { Lightbox } from "../factories/lightboxFactory.js";
import { getPhotographers } from "../api/api.js";
console.log("Window location:", window.location)

// RECUPERATION DES DATA DEPUIS L'API
const data = await getPhotographers()
console.log('la data', data)

// RECUPERATION DES PARAM URL
let params = (new URL(window.location)).searchParams;
export let userId = params.get("id");
console.log("id:", userId)   

// RECUPERTATION DES DATA DES PHOTOGRAPHES
const photographesData = data.photographers
export const photographer = photographesData.find((element) => element.id == userId);
console.log("liste des photographes:", photographer.price)

// RECUPERTATION DES MEDIA DES PHOTOGRAPHES
export const mediaArrayById = []
const gallerieData = data.media
gallerieData.forEach(element => {
    if(element.photographerId == userId) {
        mediaArrayById.push(element)
    }
})

console.log('gros test :', mediaArrayById)

// const arrByID = mediaArrayById.filter(function(mediaId){
//     if(mediaId.photographerId == userId){
//         return console.log([mediaId.title])
//     } 
// });

// console.log('gros test :', arrByID)




// console.log("liste des media:", mediaArrayById)
//SAVE TEST

// // RECUPERATION DES PARAM URL
// let params = (new URL(window.location)).searchParams;
// let id = params.get("id");
// console.log("id:", id)

// // FETCH DES DONNÉES PHOTOGRAPHES
// let page = await fetch(`data/photographers.json`)
// .then(r => r.json())
// // CIBLE LES DATA DES PHOTOGRAPHES 
// const pagePhotographe = page.photographers;
//     // Selection du photographe par son ID
// export const photographeSelectedById = pagePhotographe.find((element) => element.id == id);

// //SELECTION DES MEDIAS ET DE LEURS DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE
// const mediasPhotographes = page.media;

// export const mediaSelectedById = [];
// mediasPhotographes.forEach(element => {
//     if(element.photographerId == id) {
//         mediaSelectedById.push(element)
//     }
// })

// console.log(mediaSelectedById[1].title)
// // SELECTION PARENT DOM 
export const parentDOM = document.querySelector("main");

// FONCTION BANNER PHOTOGRAPHE
async function bannerData() {
    const photographerModel = photographerFactory(photographer);
    const userBannerDOM = photographerModel.getUserBannerDOM();
    parentDOM.appendChild(userBannerDOM);
};

// FONCTION FILTRE MEDIA
async function filterData() {
    const filter = photographerFactory(photographer);
    const photographerFilterDOM= filter.getUserMediaFilterDOM();
    parentDOM.appendChild(photographerFilterDOM);
}

// FONCTION GALERIE MEDIAS PHOTOGRAPHE
async function mediaData(mediaArrayById) {
    const photographiesSection = document.createElement('section')
    photographiesSection.classList.add('photographies_section')
    mediaArrayById.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photographerMediaDOM= mediaModel.getUserMediaDOM();
        parentDOM.appendChild(photographiesSection);
        photographiesSection.appendChild(photographerMediaDOM);
    });    
}

// FONCTION ENCARD PRIX PHOTOGRAPHE
async function likePriceData(mediaArrayById) {
    const photographerPrice = mediaFactory(mediaArrayById);
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
    // Récupère les datas des photographes et créé la bannière
    bannerData(photographer);
    filterData();
    mediaData(mediaArrayById);
    likePriceData(mediaArrayById);
    formData(photographer);
    Lightbox.init()
};
init();