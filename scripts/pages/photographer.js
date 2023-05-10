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
        factoryMedia.addEventListener('click', openLightBox);

        // mediaDOM.addEventListener('click', 'toggleLike');
        // mediaDOM.addEventListener('keydown', 'toggleLike');
    });
};

function displayMedias(media, idPhotographer){
    const containerMedias = document.createElement('div');
    containerMedias.classList.add('containerMedias');
    const main = document.querySelector("main");
    main.appendChild(containerMedias);
    addFromMediaFactory(idPhotographer, media, containerMedias);
};

function createLightBox(){
    const lightbox = document.createElement('dialog');
    const lightboxContent = document.createElement('div');
    const mediaLightbox = document.createElement('div');
    const previousArrow = document.createElement('button');
    const nextArrow = document.createElement('button');

    const closeButton = createCloseButton();

    lightbox.classList.add('lightbox');
    lightbox.setAttribute('aria-label', 'Fermerture du média');
    lightboxContent.classList.add('lightboxContent');
    mediaLightbox.classList.add('mediaLightbox');
    previousArrow.classList.add('previousArrow',"fas", "fa-angle-left");
    previousArrow.setAttribute('aria-label', 'Média précédent');
    nextArrow.classList.add('nextArrow', "fas", "fa-angle-right");
    nextArrow.setAttribute('aria-label', 'Média suivant');

    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    lightboxContent.appendChild(mediaLightbox);
    lightboxContent.appendChild(previousArrow);
    lightboxContent.appendChild(nextArrow);

    document.body.appendChild(lightbox);

    previousArrow.addEventListener('click', () => {
        clickArrow = (clickArrow - 1 + mediaPhotographer.length) % mediaPhotographer.length;
        updateLightbox(clickArrow);
    });

    nextArrow.addEventListener('click', () => {
        clickArrow = (clickArrow + 1) % mediaPhotographer.length;
        updateLightbox(clickArrow);
    });
};

let clickArrow = 0;

function openLightBox(event){
    const clickMedia = event.target.closest('.mediaArticle');
    clickArrow = mediaPhotographer.findIndex(media => media.id === parseInt(clickMedia.getAttribute('data-id')));

    const lightbox = document.querySelector('.lightbox');
    updateLightbox(clickArrow);
    lightbox.showModal();
    // lightbox.style.display = 'block';
}

function createCloseButton(){
    const closeButton = document.createElement('button');
    closeButton.classList.add('lbCloseButton', "fas", "fa-times");
    closeButton.setAttribute('aria-label', 'Fermeture du média');

    closeButton.addEventListener('click', () => {
        const lightbox = document.querySelector('.lightbox');
        // lightbox.style.display = 'none';
        lightbox.close();
    });

    return closeButton;

}

function createLightBoxContent(chooseMedia){
    const lightboxLink = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const lightboxVideo = document.createElement('video');
    const lightboxTitle = document.createElement('h3');

    lightboxLink.classList.add('lightboxLink');
    lightboxImage.classList.add('lightboxImage');
    lightboxVideo.classList.add('lightboxVideo');
    lightboxTitle.classList.add('lightboxTitle');
    lightboxTitle.textContent = chooseMedia.title;

    const mediaLightbox = document.querySelector('.mediaLightbox');
    mediaLightbox.textContent = '';

    lightboxLink.setAttribute("aria-label", `Média ${chooseMedia.title}`);
    lightboxLink.setAttribute("tabindex", "0");
    lightboxTitle.setAttribute("tabindex", "0");
    lightboxTitle.setAttribute("lang", "en");

    if(chooseMedia.image){
        const lightboxImageContainer = document.createElement('div');
        lightboxImageContainer.classList.add('lightboxImage');
        lightboxImage.setAttribute('src', `assets/images/${chooseMedia.photographerId}/${chooseMedia.image}`);
        lightboxImage.setAttribute('alt', `${chooseMedia.alt}`);
        lightboxImageContainer.appendChild(lightboxImage);
        lightboxLink.appendChild(lightboxImageContainer);
    } else if (chooseMedia.video){
        const lightboxVideoContainer = document.createElement('div');
        lightboxVideoContainer.classList.add('lightboxVideo');
        lightboxVideo.setAttribute('src', `assets/images/${chooseMedia.photographerId}/${chooseMedia.video}`);
        lightboxVideo.setAttribute('alt', `${chooseMedia.alt}`);
        lightboxVideo.controls = true;
        lightboxVideo.setAttribute('preload', 'metadata');
        lightboxVideoContainer.appendChild(lightboxVideo);
        lightboxLink.appendChild(lightboxVideoContainer);
    }
    mediaLightbox.appendChild(lightboxLink);
    mediaLightbox.appendChild(lightboxTitle);
}

function updateLightbox(clickArrow){
    const chooseMedia = mediaPhotographer[clickArrow];
    createLightBoxContent(chooseMedia);
}





async function init(){
    const data = await dataPhotographer('../../data/photographers.json');
    const {photographers, media} = data;

    createLightBox();

    document.addEventListener('keydown', (event) => {
        const lightbox = document.querySelector('.lightbox');
        if(lightbox.open){
            if (event.key === "ArrowLeft"){
                clickArrow = (clickArrow - 1 + mediaPhotographer.length) % mediaPhotographer.length;
                updateLightbox(clickArrow);
            } else if (event.key === "ArrowRight"){
                clickArrow = (clickArrow + 1) % mediaPhotographer.length;
                updateLightbox(clickArrow);
            } 
        }
    });

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


