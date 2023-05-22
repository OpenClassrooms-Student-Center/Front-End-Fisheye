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
    lightboxImg.remove();
    closeLightboxModal();
  })
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
  displayMediaInLightbox();
  selectOption();
  toggleOptionsList();
}

init();
