import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographer.js";
import { openOptionsList, selectOption } from "../utils/sortButton.js";
import { displaySortedMedias, sortMedias} from "../utils/displaySortedMedias.js";
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

  const selectLabel = document.createElement("label");
  selectLabel.classList.add("sort__label");
  selectLabel.innerText = "Trier par"

  const selectDiv = document.createElement("div");
  selectDiv.classList.add("sort__select");
  selectDiv.setAttribute("aria-label", "Order by");
  selectDiv.setAttribute("data-value", "popularity");

  const sortBtn = document.createElement("button");
  sortBtn.innerText = "Popularité";
  sortBtn.setAttribute("aria-haspopup", "list");
  sortBtn.id = "sort__button";
  sortBtn.classList.add("sort__button", "button");
  selectDiv.appendChild(sortBtn);

  const arrow = document.createElement("i");
  arrow.classList.add("sort__down", "fa-solid", "fa-caret-down");
  selectDiv.appendChild(arrow);

  const sortList = document.createElement("ul");
  sortList.classList.add("sort__options");
  sortList.setAttribute("role", "list");
  sortList.setAttribute("aria-labelledby", "sort__button");
  sortList.setAttribute("aria-activedescendant", "popularity");

  sortList.innerHTML = `
  <li
    class="sort__hide sort__option"
    data-value="popularity"
    role="option"
    id="popularity"
    aria-selected="true"
    style="display: none;"
    tabindex="0">Popularité</li>
  <li
    class="sort__option"
    data-value="date"
    role="option"
    id="date"
    tabindex="0">Date</li>
  <li
    class="sort__option"
    data-value="title"
    role="option"
    id="title"
    tabindex="0">Titre</li>
  `

  selectDiv.appendChild(sortList);
  sortSection.appendChild(selectLabel);
  sortSection.appendChild(selectDiv);
}

async function displayPhotographerMedias() {
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);
  await displaySortedMedias();
}

async function sortMedia() {
  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", function() {
      document.querySelector(".photographer__content").remove();
      displayPhotographerMedias();
    })

  })
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

async function displayMediaInLightbox() {

  const lightbox = document.querySelector(".lightboxModal");
  const mediaObj = await getMediasByPhotographer();

  const { title, image, video, photographerId } = mediaObj;

  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => media.addEventListener("click", function(event) {
    console.log(media);
    const mediaAlt = event.currentTarget.firstChild.alt;
    const mediaSource = event.currentTarget.firstChild.src;
    const currentMedia = mediaObj.find((media) => media.title === mediaAlt);
    const index = mediaObj.indexOf(currentMedia);
    console.log(index);
    console.log(currentMedia);

    if (currentMedia.image) {
      const lightboxImg = document.createElement("img");
      lightboxImg.src = mediaSource;
      lightboxImg.classList.add("lightboxModal__img")
      lightbox.prepend(lightboxImg);
    }
    else if (currentMedia.video) {
      const lightboxVideo = document.createElement("video");
      lightboxVideo.controls = "true";
      lightboxVideo.classList.add("lightboxModal__video")
      lightbox.prepend(lightboxVideo);
      const lightboxVideoSrc = document.createElement("source");
      lightboxVideoSrc.src = mediaSource;
      lightboxVideoSrc.type = "video/mp4";
      lightboxVideo.appendChild(lightboxVideoSrc);
    }
  }))



  // const lightboxMedia = document.querySelector(".lightboxModal");
  // if (image) {
  //   lightboxMedia.innerHTML += `<img class="lightbox__image" src="assets/images/${photographerId}/${image}" alt="${title}>
  //   <figcaption class="lightbox__caption">${title}</figcaption>
  //   `
  // } else if (video) {
  //   lightboxMedia.innerHTML += `<video class="lightbox__video" title="${title}" controls>
  //     <source src="assets/images/${photographerId}/${video}" type="video/mp4">
  //   </video>
  //   <figcaption class="lightbox__caption">${title}</figcaption>
  //   `
  // }
}

function openLightbox(){
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => media.addEventListener("click", function() {
    // console.log(media);
    // const mediaSource = event.currentTarget.firstChild.src;
    // console.log(mediaSource);
    // const lightbox = document.querySelector(".lightboxModal");

    // if (media.img) {
    //   console.log("img");
    // }
    // const lightboxImg = document.createElement("img");
    // lightboxImg.src = mediaSource;
    // lightboxImg.classList.add("lightboxModal__img")
    // lightbox.prepend(lightboxImg);

    displayLightboxModal();
  }))
}

function closeLightbox() {
  const closeBtn = document.querySelector(".lightboxModal__close");
  closeBtn.addEventListener("click", function() {
    const lightboxImg = document.querySelector(".lightboxModal__img");
    if (lightboxImg) {lightboxImg.remove()};
    const lightboxVideo = document.querySelector(".lightboxModal__video");
    if (lightboxVideo) {lightboxVideo.remove()};
    closeLightboxModal();
  })
}

async function init() {
  await getPhotographersById();
  await displayPhotographerHeader(photographer)
  await displaySortSection();
  await displayLikesCounter();
  await sortMedia();
  await displayPhotographerMedias();
  openContactForm();
  closeContactForm();
  closeFormWithEsc();
  openOptionsList();
  selectOption();
  openLightbox();
  closeLightbox();
  displayMediaInLightbox();
}

init();
