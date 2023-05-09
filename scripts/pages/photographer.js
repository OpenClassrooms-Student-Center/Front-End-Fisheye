//Mettre le code JavaScript lié à la page photographer.html ici.
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/mediaFactory.js";
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

const totalLikes = (mediaPhotographer) =>{
    const total = mediaPhotographer.reduce((acc, media) => acc + media.likes, 0);
    return total;    
};

function displayLikesPrice(mediaPhotographer, photographer){
    const total = totalLikes(mediaPhotographer);
    const price = photographer.price;
    const likesPrice = document.createElement( 'div');
    likesPrice.classList.add('likesPrice');

    const pPrice = document.createElement( 'p');
    pPrice.classList.add('pPrice');

    const pLikes = document.createElement( 'p');
    pLikes.classList.add('pLikes');

    pPrice.innerHTML = `${price}€/jour`;
    pLikes.innerHTML = `${total} <i class="fas fa-heart"></i>`;

    likesPrice.appendChild(pLikes);
    likesPrice.appendChild(pPrice);
    

    const main = document.querySelector("#main");
    main.appendChild(likesPrice);
};



function addFromMediaFactory(idPhotographer, mediaPhotographer, containerMedias){
    mediaPhotographer.forEach(media => {
        media.photographerId = idPhotographer;
        const factoryMedia = mediaFactory(media);
        const mediaDOM = factoryMedia.querySelector('.mediaArticle');
        containerMedias.appendChild(factoryMedia);
    });
};

function displayMedias(media, idPhotographer){
    const containerMedias = document.createElement('div');
    containerMedias.classList.add('containerMedias');
    const main = document.querySelector("main");
    main.appendChild(containerMedias);
    addFromMediaFactory(idPhotographer, media, containerMedias);
};



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
    displayLikesPrice(mediaPhotographer, photographer);
    displayMedias(mediaPhotographer, idPhotographer);
};

init();


