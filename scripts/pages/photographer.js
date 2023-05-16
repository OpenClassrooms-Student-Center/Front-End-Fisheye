
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal, closeModalWithEsc } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";

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
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);

  medias.forEach(media => {
    const data = mediaFactory(media);
    const medias = data.getMediaCardDom();
  });
}



async function init() {
  displayPhotographerHeader(photographer);
  displayPhotographerMedias()
}

function displayNameInModal() {
  const { name } = photographer
  const title = document.querySelector(".form__title")
  title.innerHTML += `<br>${name}`
}

function openContactModal() {
  const contactBtn = document.querySelector(".contact__button");
  contactBtn.addEventListener("click", displayModal);
  contactBtn.focus();
  displayNameInModal();
}

function closeContactModal() {
  const closeBtn = document.querySelector(".form__close");
  closeBtn.addEventListener("click", closeModal);
  const contactBtn = document.querySelector(".contact__button");
  contactBtn.focus();
}


init();
// sortMedias()
openContactModal();
closeContactModal();
closeModalWithEsc();
