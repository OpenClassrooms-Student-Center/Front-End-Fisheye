import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographer.js";
import { openOptionsList, selectOption } from "../utils/sortButton.js";
import { createSortedMediasCards, sortMedias } from "../utils/sortMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { openContactForm } from "../utils/contactForm.js";
import { openLightbox, disableLightboxButtons } from "../utils/lightBox.js";

const main = document.querySelector("main");
const footer = document.querySelector("footer");
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

  const selectLabel = document.createElement("p");
  selectLabel.classList.add("sort__label");
  selectLabel.innerText = "Trier par"

  const selectDiv = document.createElement("div");
  selectDiv.classList.add("sort__select");
  selectDiv.setAttribute("aria-label", "Order by");
  selectDiv.setAttribute("data-value", "popularity");
  selectDiv.setAttribute("aria-label", "dropdown");

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
  await createSortedMediasCards();
  displayMediasInLightbox();
  likeMedia();
}
async function renderSortedMedias() {
  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", async () => {
      document.querySelector(".photographer__content").remove();
      await displayPhotographerMedias();
    })
  })
}

async function displayLikesCounter() {
  // crée et affiche une div contenant le total de like et le prix journalier du photographe
  const photographer = await getPhotographersById();
  // const likesDiv = document.createElement("div");
  footer.classList.add("counter");
  footer.setAttribute("aria-label", "Total of likes and price per day")
  // footer.appendChild(likesDiv)
  const medias = await getMediasByPhotographer();
  let totalLikes = 0;
  medias.forEach(media => {
    totalLikes += media.likes
  });
  footer.innerHTML += `
  <div class="counter__likes" aria-label="likes counter">
    <p class="likes">${totalLikes}</p>
    <i class="fa-solid fa-heart"></i>
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
  }
  disableLightboxButtons(mediaIndex, medias.length)
}

async function findNextMedia() {
  const medias = await sortMedias();
  const currentMedia = medias.find((media) => media.id == mediaLightboxId);
  const currentMediaIndex = medias.indexOf(currentMedia);

  if (currentMediaIndex < medias.length - 1) {
    let nextIndex = currentMediaIndex + 1;
    const nextMediaId = medias[nextIndex].id;
    return nextMediaId
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
      renderMedia(mediaId);
      nextMediaWithArrow();
      previousMediaWithArrow();
    })
  })
  // au click sur le bouton next, on récupère le nouvel index, et on rappelle la fonction pour créer l'html du média
  const next = document.querySelector(".lightboxModal__next");
  next.addEventListener("click", async () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      const nextId = await findNextMedia()
      renderMedia(nextId);
    }
  })
   // au click sur le bouton previous, on récupère le nouvel index, et on rappelle la fonction pour créer l'html du média
  const previous = document.querySelector(".lightboxModal__previous");
  previous.addEventListener("click", async () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      const previousId = await findPreviousMedia()
      renderMedia(previousId);
    }
  })
}

function nextMediaWithArrow() {
  const lightbox = document.querySelector(".lightboxModal");
  const next = document.querySelector(".lightboxModal__next");
  document.addEventListener("keydown", async (event) => {
    if (next.style.display === "block") {
      const code = event.code
      if (lightbox.getAttribute('aria-hidden') == 'false' && code === "ArrowRight") {
        if (document.querySelector(".lightboxModal__figure")) {
          document.querySelector(".lightboxModal__figure").remove()
          const nextId = await findNextMedia();
          renderMedia(nextId)
        }
      }
    }
  })
}
function previousMediaWithArrow() {
  const lightbox = document.querySelector(".lightboxModal");
  const previous = document.querySelector(".lightboxModal__previous");
  document.addEventListener("keydown", async (event) => {
    if (previous.style.display === "block") {
      const code = event.code
      if (lightbox.getAttribute('aria-hidden') == 'false' && code === "ArrowLeft") {
        if (document.querySelector(".lightboxModal__figure")) {
          document.querySelector(".lightboxModal__figure").remove()
          const previousId = await findPreviousMedia();
          renderMedia(previousId)
        }
      }
    }
  })
}


async function init() {
  await displayPhotographerHeader()
  await displaySortSection();
  await displayPhotographerMedias();
  openOptionsList();
  selectOption();
  openContactForm();
  renderSortedMedias();
  await displayLikesCounter();

}

init();
