
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { closeContactModal, openContactModal, closeModalWithEsc } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { sortMedias } from "../utils/sortMedias.js";

const main = document.querySelector("main");

const photographer = await getPhotographersById();

async function displayPhotographerHeader() {
  const datas = photographerFactory(photographer).getUserHeader();
  const photographerHeader = document.createElement("section");
  photographerHeader.classList.add("photographer__header");
  photographerHeader.innerHTML = datas
  main.prepend(photographerHeader);
}

async function displayPhotographerMedias() {
  const medias = await getMediasByPhotographer();
  // console.log(medias);
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);

  sortMedias(medias);

  medias.forEach(media => {
    const data = mediaFactory(media);
    // console.log(data);
    // data.getMediaCardDom();
  });
}

async function init() {
  displayPhotographerHeader(photographer);
  displayPhotographerMedias()
  openContactModal();
  closeContactModal();
  closeModalWithEsc();
}

init();
// sortMedias()
