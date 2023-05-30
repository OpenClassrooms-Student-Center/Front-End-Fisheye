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
  sortBtn.setAttribute("aria-haspopup", "listbox");
  sortBtn.setAttribute("aria-expanded", "");
  sortBtn.id = "sort__button";
  sortBtn.classList.add("sort__button", "button");
  selectDiv.appendChild(sortBtn);

  const arrow = document.createElement("i");
  arrow.classList.add("sort__down", "fa-solid", "fa-caret-down");
  sortBtn.appendChild(arrow);

  const sortList = document.createElement("div");
  sortList.classList.add("sort__options");
  sortList.setAttribute("role", "list");
  sortList.setAttribute("aria-labelledby", "sort__button");
  sortList.setAttribute("aria-activedescendant", "popularity");

  sortList.innerHTML = `
  <button class="sort__optionBtn sort__hide sort__option"
    data-value="popularity"
    role="listbox"
    id="popularity"
    aria-selected="true"
    style="display: none;"
    tabindex="-1">Popularité
  </button>
  <button class="sort__optionBtn sort__option"
    data-value="date"
    role="listbox"
    id="date"
    tabindex="0">Date
    </button>
    <button class="sort__optionBtn sort__option"
    data-value="title"
    role="listbox"
    id="title"
    tabindex="0">Titre
    </button>
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
  const results = await createSortedMediasCards();
  // displayMediasInLightbox();
  return results
}

async function displayLikesCounter() {
  // crée et affiche une div contenant le total de like et le prix journalier du photographe
  const photographer = await getPhotographersById();
  const likesDiv = document.createElement("div");
  likesDiv.classList.add("counter")
  main.appendChild(likesDiv)
  const medias = await getMediasByPhotographer();
  let totalLikes = 0;
  medias.forEach(media => {
    totalLikes += media.likes
  });
  likesDiv.innerHTML += `
  <div class="counter__likes">
    <p class="likes">${totalLikes} </p>
    <i class="fa-solid fa-heart "></i>
  </div>
  <p class="price">${photographer.price}€ / jour</p>
  `
}
async function likeMedia() {
  const medias = document.querySelectorAll(".media");
  medias.forEach(media => {
    let likesNumber = parseInt(media.querySelector(".media__likeNumber").innerText);
    const likeBtn = media.querySelector(".media__likeIcon");

    likeBtn.addEventListener("click", () => {
      if (!likeBtn.hasAttribute("clicked")) {
        likeBtn.toggleAttribute("clicked");
        likeBtn.classList.toggle("fa-regular");
        likeBtn.classList.toggle("fa-solid");
        likesNumber += 1
        media.querySelector(".media__likeNumber").innerText = likesNumber
      } else {
        likeBtn.toggleAttribute("clicked");
        likeBtn.classList.toggle("fa-regular");
        likeBtn.classList.toggle("fa-solid");
        likesNumber -= 1
        media.querySelector(".media__likeNumber").innerText = likesNumber
      }
      updateLikes()
    })
  })
}
function updateLikes() {
  const likes = document.querySelectorAll(".media__likeNumber");
  const totalLikes = document.querySelector(".likes");
  let total = 0
  likes.forEach(like => total += parseInt(like.textContent));
  totalLikes.textContent = total
}

async function renderMedia(mediaId) {
  // fonction qui crée la card du média, en fonction de si c'est une image ou une vidéo
  const medias = await sortMedias();

  const media = medias.find((media) => media.id == mediaId);
  console.log(media);
  const mediaIndex = medias.findIndex((media) => media.id == mediaId);
  const { title, image, video, photographerId } = media;
  mediaLightboxId = mediaId;
  const lightbox = document.querySelector(".lightboxModal");

  if (media.image) {
    const figure = document.createElement("figure");
    figure.classList.add("lightboxModal__figure")

    const lightboxImg = document.createElement("img");
    lightboxImg.src = `assets/photographers/${photographerId}/${image}`;
    lightboxImg.alt = `${title}`;
    lightboxImg.classList.add("lightboxModal__img");
    figure.appendChild(lightboxImg);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = `${title}`;
    figure.appendChild(caption);

    lightbox.prepend(figure);
    // console.log(figure);

  } else if (media.video) {

    const figure = document.createElement("figure");
    figure.classList.add("lightboxModal__figure")

    const lightboxVideo = document.createElement("video");
    lightboxVideo.controls = "true";
    lightboxVideo.classList.add("lightboxModal__video")
    figure.appendChild(lightboxVideo);

    const lightboxVideoSrc = document.createElement("source");
    lightboxVideoSrc.src = `assets/photographers/${photographerId}/${video}`;
    lightboxVideoSrc.type = "video/mp4";
    lightboxVideo.appendChild(lightboxVideoSrc);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = `${title}`;
    figure.appendChild(caption);

    lightbox.prepend(figure);
    console.log(figure);
  }
  console.log(`function renderMedia(${mediaId})`);
  disableLightboxButtons(mediaIndex, medias.length)
}

async function findNextMedia() {
  const medias = await sortMedias();
  const currentMedia = medias.find((media) => media.id == mediaLightboxId);
  const currentMediaIndex = medias.indexOf(currentMedia);
  console.log("render next media");

  if (currentMediaIndex < medias.length - 1) {
    let nextIndex = currentMediaIndex + 1;
    const nextMediaId = medias[nextIndex].id;
    console.log("condition render next media");
    // renderMedia(nextMediaId);
    console.log(nextMediaId);
    return nextMediaId
    // disableLightboxButtons(nextIndex, medias.length)
  }
}

async function findPreviousMedia() {
  const medias = await sortMedias();
  const currentMedia = medias.find((media) => media.id == mediaLightboxId);
  const currentMediaIndex = medias.indexOf(currentMedia);

  if (currentMediaIndex > 0) {
    let previousIndex = currentMediaIndex - 1;
    const previousMediaId = medias[previousIndex].id;
    // renderMedia(previousMediaId);
    return previousMediaId
    // disableLightboxButtons(previousIndex, medias.length)
  }
}

async function displayMediasInLightbox() {

  // au click sur un média, on récupère son index dans l'array de média trié, et on l'affiche en fonction de son index dans la lightbox
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => {
    media.firstChild.addEventListener("click", async () => {
      const mediaId = media.id
      openLightbox();
      console.log("displayMediaInLightbox");
      renderMedia(mediaId);
    })
  })

  // au click sur le bouton next, on récupère le nouvel index, et on rappelle la fonction pour créer l'html du média
  const next = document.querySelector(".lightboxModal__next");
  // console.log("next", document.querySelector(".lightboxModal__figure")

  next.addEventListener("click", () => {
    console.log("click", document.querySelector(".lightboxModal__figure"))
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      // document.querySelectorAll(".lightboxModal__figure").forEach(el => el.remove())
    }
    const nextId = findNextMedia()
    renderMedia(nextId);
  })

   // au click sur le bouton previous, on récupère le nouvel index, et on rappelle la fonction pour créer l'html du média
  const previous = document.querySelector(".lightboxModal__previous");
  previous.addEventListener("click", () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      renderPreviousMedia();
    }
  })
}

async function renderSortedMedias() {
  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", async () => {
      document.querySelector(".photographer__content").remove();
      await displayPhotographerMedias();
      // console.log(medias);
      // setTimeout(async() => {
      // }, 1);
    })
  })
  displayMediasInLightbox();
}

async function init() {
  await displayPhotographerHeader()
  await displaySortSection();
  await displayPhotographerMedias();
  openOptionsList();
  selectOption();
  openContactForm();
  renderSortedMedias();
  // await displayMediasInLightbox();
  await displayLikesCounter();
  likeMedia();
}

init();
