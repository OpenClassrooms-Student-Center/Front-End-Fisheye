import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographer.js";
import { openOptionsList, selectOption } from "../utils/sortButton.js";
import { createSortedMediasCards, sortMedias } from "../utils/sortMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { openContactForm } from "../utils/contactForm.js";
import { openLightbox, disableLightboxButtons } from "../utils/lightBox.js";

const main = document.querySelector("main");
let mediaLightboxId = 0;

async function displayPhotographerHeader() {
  // affiche les informations de chaque photographe
  const photographer = await getPhotographersById();
  const datas = photographerFactory(photographer).getUserHeader();
  const photographerHeader = document.createElement("section");
  photographerHeader.classList.add("photographer__header");
  photographerHeader.innerHTML = datas
  main.appendChild(photographerHeader);
}

async function displaySortSection() {
  // affiche la section qui contient le bouton de tri des medias
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
  // affiche la section contenant les medias des photographes, et appelle la fonction créant les cards pour chaque média

  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);
  await createSortedMediasCards();
  const medias = document.querySelectorAll(".media");

  // pour chaque média, on crée un attribut indexNumber correspondant au numéro d'index dans l'array de médias
  for (let i = 0; i < medias.length; i++) {
    medias[i].dataset.index = i
  }
}
function displaySortedMedias() {
  // affiche les médias en fonction du tri demandé lors du click sur le choix de tri

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
  // crée et affiche une div contenant le total de like et le prix journalier du photographe
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

async function renderMedia(mediaId) {
  // fonction qui crée la card du média, en fonction de si c'est une image ou une vidéo
  const medias = await sortMedias();

  const media = medias.find((media) => media.id == mediaId)
  const { title, image, video, photographerId } = media;
  mediaLightboxId = mediaId;
  const lightbox = document.querySelector(".lightboxModal");

  if (media.image) {
    const content = document.createElement("figure");
    content.classList.add("lightboxModal__figure")

    const lightboxImg = document.createElement("img");
    lightboxImg.src = `assets/photographers/${photographerId}/${image}`;
    lightboxImg.alt = `${title}`;
    lightboxImg.classList.add("lightboxModal__img");
    content.appendChild(lightboxImg);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = `${title}`;
    content.appendChild(caption);

    lightbox.prepend(content);

  } else if (media.video) {

    const content = document.createElement("figure");
    content.classList.add("lightboxModal__figure")

    const lightboxVideo = document.createElement("video");
    lightboxVideo.controls = "true";
    lightboxVideo.classList.add("lightboxModal__video")
    content.appendChild(lightboxVideo);

    const lightboxVideoSrc = document.createElement("source");
    lightboxVideoSrc.src = `assets/photographers/${photographerId}/${video}`;
    lightboxVideoSrc.type = "video/mp4";
    lightboxVideo.appendChild(lightboxVideoSrc);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = `${title}`;
    content.appendChild(caption);

    lightbox.prepend(content);
  }
}

async function renderNextMedia() {
  const medias = await sortMedias();
  const currentMedia = medias.find((media) => media.id == mediaLightboxId);
  const currentMediaIndex = medias.indexOf(currentMedia);

  if (currentMediaIndex < medias.length - 1) {
    let nextIndex = currentMediaIndex + 1;
    const nextMediaId = medias[nextIndex].id;
    renderMedia(nextMediaId);
    disableLightboxButtons(nextIndex, medias.length)
  }
}
async function renderPreviousMedia() {
  const medias = await sortMedias();
  const currentMedia = medias.find((media) => media.id == mediaLightboxId);
  const currentMediaIndex = medias.indexOf(currentMedia);

  if (currentMediaIndex > 0) {
    let previousIndex = currentMediaIndex - 1;
    const previousMediaId = medias[previousIndex].id;
    renderMedia(previousMediaId);
    disableLightboxButtons(previousIndex, medias.length)
  }
}

// au click sur un média, on récupère son index dans l'array de média trié, et on l'affiche en fonction de son index dans la lightbox
async function displayMediasInLightbox() {
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => {
    media.addEventListener("click", async () => {
      const mediaId = media.id
      openLightbox();
      await renderMedia(mediaId);
    })
  })

  // au click sur le bouton next, on récupère le nouvel index, et on rappelle la fonction pour créer l'html du média
  const next = document.querySelector(".lightboxModal__next");
  next.addEventListener("click", () => {
    const figure = document.querySelector(".lightboxModal__figure");
    figure.remove();
    disableLightboxButtons()
    renderNextMedia();
  })

  const previous = document.querySelector(".lightboxModal__previous");
  previous.addEventListener("click", () => {
    const figure = document.querySelector(".lightboxModal__figure");
    figure.remove();
    disableLightboxButtons()
    renderPreviousMedia();
  })

}

async function init() {
  await displayPhotographerHeader()
  await displaySortSection();
  await displayLikesCounter();
  await displayPhotographerMedias();
  await displayMediasInLightbox();
  openOptionsList();
  selectOption();
  openContactForm();
  displaySortedMedias();
}

init();
