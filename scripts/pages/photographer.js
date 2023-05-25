import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographer.js";
import { openOptionsList, selectOption } from "../utils/sortButton.js";
import { createSortedMediasCards } from "../utils/sortMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { openContactForm } from "../utils/contactForm.js";
import { openLightbox } from "../utils/lightBox.js";

const main = document.querySelector("main");

async function displayPhotographerHeader() {
  const photographer = await getPhotographersById();
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
  await createSortedMediasCards();
  displayMediasInLightbox();
}

function displaySortedMedias() {

  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", () => {
      document.querySelector(".photographer__content").innerHTML = "";
      setTimeout(async() => {
        await displayPhotographerMedias();
      }, 1);
    })
  })
}

async function displayLikesCounter() {
  const photographer = await getPhotographersById();
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

function displayMediasInLightbox() {
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => media.addEventListener("click", () => {
    openLightbox();
    // findCurrentMedia(medias, event);
    const index = findCurrentMediaIndex(medias, media);
    console.log(index);

    const mediaSource = media.firstChild.src;
    const lightbox = document.querySelector(".lightboxModal");

    if (media.firstChild.classList.contains("media__img")) {
      const lightboxImg = document.createElement("img");
      lightboxImg.src = mediaSource;
      lightboxImg.classList.add("lightboxModal__img")
      lightbox.prepend(lightboxImg);
    } else if (media.firstChild.classList.contains("media__video")) {
      const lightboxVideo = document.createElement("video");
      lightboxVideo.controls = "true";
      lightboxVideo.classList.add("lightboxModal__video")
      lightbox.prepend(lightboxVideo);
      const lightboxVideoSrc = document.createElement("source");
      lightboxVideoSrc.src = mediaSource;
      lightboxVideoSrc.type = "video/mp4";
      lightboxVideo.appendChild(lightboxVideoSrc);
    }

    const previous = document.querySelector(".lightboxModal__previous");
    const next = document.querySelector(".lightboxModal__next");
    if (index === 0) {
      previous.style.display = "none";
    } else if (index === medias.length -1) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
      previous.style.display = "block";
    }
  }))
}


function findCurrentMedia(medias, event) {
  const mediaAlt = event.currentTarget.firstChild.alt;
  const currentMedia = medias.find(media => media.firstChild.alt === mediaAlt)
  console.log(currentMedia);
  return currentMedia
}
function findCurrentMediaIndex(medias, media) {
  const mediaAlt = media.firstChild.alt;
  const currentMedia = medias.find(media => media.firstChild.alt === mediaAlt)
  const index = medias.indexOf(currentMedia);
  return index;
}


// function findNextMedia(event, medias) {
//   const mediaAlt = event.currentTarget.firstChild.alt;
//   // const mediaSource = event.currentTarget.firstChild.src;
//   let currentMedia = medias.find(media => media.firstChild.alt === mediaAlt)
//   const index = medias.indexOf(currentMedia);
//   const mediasLength = medias.length;
//   if (index < mediasLength + 1) {
//     currentMedia = medias[index+1]
//   } else {
//     currentMedia = medias[0]
//   }
//   return currentMedia;
// }

async function init() {
  await displayPhotographerHeader()
  await displaySortSection();
  await displayLikesCounter();
  await displayPhotographerMedias();
  displaySortedMedias();
  openOptionsList();
  selectOption();
  openContactForm();
}

init();
