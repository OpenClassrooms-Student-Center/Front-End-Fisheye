
import { getPhotographersById } from "../utils/getPhotographerById.js";
import { closeContactModal, openContactModal, closeModalWithEsc } from "../utils/contactForm.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { displaySortedMedias, sortMedias } from "../utils/displaySortedMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";

const main = document.querySelector("main");

const photographer = await getPhotographersById();
// const { price } = photographer

async function displayPhotographerHeader() {
  const datas = photographerFactory(photographer).getUserHeader();
  const photographerHeader = document.createElement("section");
  photographerHeader.classList.add("photographer__header");
  photographerHeader.innerHTML = datas
  main.appendChild(photographerHeader);
}

async function displaySortSection() {
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
}


async function displayPhotographerMedias() {
  // document.querySelector(".photographer__content").innerHTML = "<section></section>"
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  // mediaSection.innerHTML = "";
  main.appendChild(mediaSection);

  displaySortedMedias();


}

async function displayLikesCounter() {
  const likesDiv = document.createElement("div");
  likesDiv.classList.add("likes__counter")
  main.appendChild(likesDiv)
  const medias = await getMediasByPhotographer();
  let totalLikes = 0;
  medias.forEach(media => {
    totalLikes += media.likes
  });
  likesDiv.innerHTML += `
  <p>${totalLikes} <i class="fa-solid fa-heart "></i>   Prix: ${photographer.price}/jour</p>
  `
}

async function init() {
  getPhotographersById();
  displayPhotographerHeader(photographer)
  displaySortSection();
  displayPhotographerMedias()
  displayLikesCounter();
  openContactModal();
  closeContactModal();
  closeModalWithEsc();
}

init();

const orderBtn = document.getElementById("sort__by");
// console.log(orderBtn);
orderBtn.addEventListener("change", displayPhotographerMedias)
// sortMedias()
