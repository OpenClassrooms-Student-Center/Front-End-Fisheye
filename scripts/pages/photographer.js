import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographer.js";
import { selectOption, toggleOptionsList, displaySortedMedias, sortMedias} from "../utils/displaySortedMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { openContactForm, closeContactForm, closeFormWithEsc } from "../utils/contactForm.js";
import { closeLightboxModal, displayLightboxModal } from "../utils/lightBox.js";

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
  sortSection.classList.add("sort");
  main.appendChild(sortSection)

  const selectDiv = document.createElement("div");
  selectDiv.classList.add("sort__menu");
  selectDiv.innerHTML += `
  <span> Trier par </span>
  <div class="sort__select" aria-label="button">
    Popularité
    <i class="fa-solid fa-caret-down"></i>
    </div>
  <div class="sort__list">
    <option class="sort__option" value="Popularity">Popularité</option>
    <option class="sort__option" value="Date">Date</option>
    <option class="sort__option" value="Title">Titre</option>
  </div>
  `
  sortSection.appendChild(selectDiv);
}

async function displayPhotographerMedias() {
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
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
  <p class="likes">${totalLikes} <i class="fa-solid fa-heart "></i></p>
  <p class="price">${photographer.price}€ / jour</p>
  `
}

function sortMedia() {
  const orderBtn = document.querySelector(".sort__list");
  orderBtn.addEventListener("click", function() {
    document.querySelector(".photographer__content").remove();
    displayPhotographerMedias();
  })
}

async function displayMediaInLightbox(event) {

  const target = event.currentTarget;
  console.log(target);
  const medias = await sortMedias();
  console.log(medias);
  console.log(medias.length);
  const index = medias.indexOf(target);
  console.log(index);




  // const { title, image, video, photographerId } = mediaObj;

  // const lightboxMedia = document.querySelector(".lightbox__center");
  // if (image) {
  //   lightboxMedia.innerHTML = `<img class="lightbox__image" src="assets/images/${photographerId}/${image}" alt="${title}>
  //   <figcaption class="lightbox__caption">${title}</figcaption>
  //   `
  // } else if (video) {
  //   lightboxMedia.innerHTML = `<video class="lightbox__video" title="${title}" controls>
  //     <source src="assets/images/${photographerId}/${video}" type="video/mp4">
  //   </video>
  //   <figcaption class="lightbox__caption">${title}</figcaption>
  //   `
  // }
}

function openLightbox(){
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => media.addEventListener("click", function(event) {
    displayMediaInLightbox(event);
  }))
}

function closeLightbox() {
  const closeBtn = document.querySelector(".lightbox__close");
  closeBtn.addEventListener("click", closeLightboxModal);
}

async function init() {
  await getPhotographersById();
  await displayPhotographerHeader(photographer)
  await displaySortSection();
  await displayPhotographerMedias();
  await displayLikesCounter();
  openContactForm();
  closeContactForm();
  closeFormWithEsc();
  sortMedia();
  openLightbox();
  closeLightbox();
  // displayLightboxModal();
  selectOption();
  toggleOptionsList();
}

init();
