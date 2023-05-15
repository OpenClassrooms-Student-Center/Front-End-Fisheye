// import { displayModal } from "../utils/contactForm.js";
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal, closeModalWithEsc } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";

const main = document.querySelector("main");

const photographer = await getPhotographersById();

async function displayPhotographerHeader() {
  const datas = photographerFactory(photographer);
  const photographerHeader = datas.getUserHeader()
  main.innerHTML += photographerHeader;
}

const medias = await getMediasByPhotographer();
// console.log(medias);

async function displayPhotographerMedias() {
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);

  medias.forEach(media => {
    // console.log(media);
    const data = mediaFactory(media);
    const medias = data.getMediaCardDom();
    // main.innerHTML += medias
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
  // console.log(contactBtn);
  contactBtn.focus();
}


init();
openContactModal();
closeContactModal();
closeModalWithEsc();
