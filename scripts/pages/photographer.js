
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
  const sortSection = document.createElement("section");
  sortSection.classList.add("sort")
  sortSection.innerHTML += `
  <label for="sort__by">Trier par</label>
  <select id="sort__by" aria-label="button">
  <option class="sort__value" value="Popularity">Popularité</option>
  <option class="sort__value" value="Date">Date</option>
      <option class="sort__value" value="Title">Titre</option>
      </select>
      `
  main.appendChild(sortSection)


  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);


  const sortedMedias = await sortMedias();
  console.log(sortedMedias);
  sortedMedias.forEach(media => {
    const data = mediaFactory(media);
    data.getMediaCardDom();
  });
}

async function init() {
  displayPhotographerHeader(photographer)
  displayPhotographerMedias()
  openContactModal();
  closeContactModal();
  closeModalWithEsc();
}

init();

const orderBtn = document.getElementById("sort__by");
console.log(orderBtn);

orderBtn.addEventListener("change", sortMedias)
// sortMedias()
