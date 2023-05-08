import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";

let photographerMedia = [];

async function getData(file) {
  // La méthode "fetch" est appelée avec l'URL du fichier JSON. 
  // Elle renvoie une promesse qui est résolue avec un objet de réponse HTTP 
  // lorsqu'elle est terminée
  const response = await fetch(file);
  // La méthode "json" est appelée sur l'objet de réponse, 
  // ce qui renvoie une autre promesse qui est résolue avec les données 
  // du fichier JSON parsées en tant qu'objet JS
  const data = await response.json();
  // La fonction retourne les données parsées du fichier JSON sous forme d'objet JS
  return data;
};

// Fonction qui va chercher un photographe dans le tableau des photographes
// en fonction de son id, et qui le retourne
const foundPhotographer = (photographers, id) => {
  const photographer = photographers.find(photographer => photographer.id === id);
  return photographer;
};

// Fonction qui va chercher les médias d'un photographe dans le tableau des médias
// en fonction de son id, et qui les retourne, sous forme de tableau
const foundMedia = (media, id) => {
  const mediaList = media.filter(media => media.photographerId === id);
  return mediaList;
};

// Fonction qui affiche les données du photographe dans le header de la page
function displayDataHeader(photographer) {
  // On crée une instance de la classe PhotographerFactory
  // en lui passant en paramètre l'objet photographe
  const factoryPhotographer = photographerFactory(photographer);
  const photographHeader = document.querySelector(".photograph-header");

  // On appelle la méthode "getPhotographerDom" de l'instance de la classe PhotographerFactory
  const userCardDOM = factoryPhotographer.getPhotographerDom();

  // On récupère les éléments du DOM qui nous intéressent
  const { div, img } = userCardDOM;
  const contactButton = document.querySelector(".contact_button");

  // Insère l'élément div représentant les informations du 
  // photographe avant le bouton "Contactez-moi"
  photographHeader.insertBefore(div, contactButton);

  // On insère l'image du photographe dans le DOM
  photographHeader.insertBefore(img, contactButton.nextSibling);
  const ModaleContact = document.getElementById("contact_modal");

  // On ajoute un attribut "aria-label" à la modale de contact
  ModaleContact.setAttribute("aria-label", `Contactez-moi ${photographer.name}`);
}

const totalLikes = (photographerMedia) => {
  const calculLikes = photographerMedia.reduce((acc, media) => acc + media.likes, 0);
  return calculLikes;
};

function displayLikesPrice(photographer, photographerMedia) {
  const calculLikes = totalLikes(photographerMedia);
  const price = photographer.price;
  const likesPrice = document.createElement("div");
  likesPrice.classList.add("likes-price");

  const likesP = document.createElement("p");
  likesP.classList.add("likes");

  const priceP = document.createElement("p"); 
  priceP.classList.add("pricePhotographer");

  likesP.innerHTML = ` ${calculLikes} <i class="fas fa-heart"></i> `;
  priceP.textContent = `${price}€ / jour`;

  likesPrice.appendChild(likesP);
  likesPrice.appendChild(priceP);
  
  const main = document.querySelector("#main");
  main.appendChild(likesPrice);
};

function addFromMediaFactory(idPhotograph, photographerMedia, containerMedia) {
  photographerMedia.forEach(media => {
    media.photographerId = idPhotograph;
    const factoryMedia = mediaFactory(media);
    const mediaDom = factoryMedia.querySelector(".articleMedia");
    containerMedia.appendChild(factoryMedia);
  });
};

function displayMedia(media, idPhotograph) {
  
  const containerMedia = document.createElement("div");
  containerMedia.classList.add("containerMedia");

  const main = document.querySelector("#main");
  main.appendChild(containerMedia);

  addFromMediaFactory(idPhotograph, media, containerMedia);

};


// Fonction qui affiche les médias du photographe dans la section "Médias"
async function init() {
  const data = await getData("../../data/photographers.json");
  // On récupère les données du fichier JSON
  const { photographers, media } = data;
  // On récupère l'id du photographe dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  // On convertit l'id du photographe en nombre entier
  const idPhotograph = parseInt(urlParams.get("id"));
  // On récupère le photographe dans le tableau des photographes
  const photographer = foundPhotographer(photographers, idPhotograph);

  const photographerName = document.querySelector(".photographerName");
  photographerName.textContent = photographer.name;

  photographerMedia = foundMedia(media, idPhotograph);

  displayDataHeader(photographer);
  displayLikesPrice(photographer, photographerMedia);
  displayMedia(photographerMedia, idPhotograph);
}

init();
