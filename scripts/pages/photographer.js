
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal, closeModalWithEsc } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { sortMedias, getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";

const main = document.querySelector("main");

const photographer = await getPhotographersById();

async function displayPhotographerHeader() {
  const datas = photographerFactory(photographer);
  const photographerHeader = datas.getUserHeader()
  main.innerHTML += photographerHeader;
}

async function displaySortButton() {
  const sortButton = `
  <div class="sort">
  <label for="sort__by">Trier par</label>

  <select id="sort__by" aria-label="button">
  <option class="sort__value" value="Popularity">Popularité</option>
  <option class="sort__value" value="Date">Date</option>
  <option class="sort__value" value="Title">Titre</option>
  </select>
  </div>
  `;
  main.innerHTML += sortButton;
  const dropdown__btn = document.querySelector("#sort__by");
  dropdown__btn.addEventListener("change", sortMedias)
}

const medias = await getMediasByPhotographer();

async function displayPhotographerMedias() {
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
  displaySortButton();
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
openContactModal();
closeContactModal();
closeModalWithEsc();
