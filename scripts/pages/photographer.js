import { photographerFactory } from "../factories/photographer.js";
// import { mediaFactory } from "../factories/media.js";

let photographerMedia = [];

async function getData(file) {
  const response = await fetch(file);
  const data = await response.json();
  return data;
};

const foundPhotographer = (photographers, id) => {
  const photographer = photographers.find(photographer => photographer.id === id);
  return photographer;
};


const foundMedia = (media, id) => {
  const mediaList = media.filter(media => media.photographerId === id);
  return mediaList;
};

function displayDataHeader(photographer) {
  const factoryPhotographer = photographerFactory(photographer);
  const photographHeader = document.querySelector(".photograph-header");
  const userCardDOM = factoryPhotographer.getPhotographerDom();
  const { div, img } = userCardDOM;
  const contactButton = document.querySelector(".contact_button");

  photographHeader.insertBefore(div, contactButton);
  photographHeader.insertBefore(img, contactButton.nextSibling);
  const ModaleContact = document.getElementById("contact_modal");
  ModaleContact.setAttribute("aria-label", `Contactez-moi ${photographer.name}`);
}

async function init() {
  const data = await getData("../../data/photographers.json");
  const { photographers, media } = data;
  const urlParams = new URLSearchParams(window.location.search);
  const idPhotograph = parseInt(urlParams.get("id"));
  const photographer = foundPhotographer(photographers, idPhotograph);

  const photographerName = document.querySelector(".photographerName");
  photographerName.textContent = photographer.name;

  photographerMedia = foundMedia(media, idPhotograph);

  foundPhotographer(photographers, idPhotograph);
  foundMedia(media, idPhotograph);
  displayDataHeader(photographer);

}

init();
