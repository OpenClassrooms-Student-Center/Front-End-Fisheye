import { getPhotographersById } from "../utils/getPhotographerById.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { initOptionsList } from "../utils/sortButton.js";
import { createSortedMediasCards, sortMedias } from "../utils/sortMedias.js";
import { getMediasByPhotographer } from "../utils/getMediasByPhotographer.js";
import { initForm } from "../utils/contactForm.js";
import { initLightbox, disableLightboxButtons } from "../utils/lightBox.js";

const main = document.querySelector("main");
let mediaLightboxId = 0;
let photographer = null;
let factory = null;

async function init() {
  photographer = await getPhotographersById();
  factory = photographerFactory(photographer);
  await renderHeader();
  await renderMedias();
  initOptionsList();
  initForm();
  renderSortedMedias();
  await renderLikesCounter();
}

async function renderHeader() {
  const photographerHeader = document.createElement("section");
  photographerHeader.classList.add("photographer__header");
  photographerHeader.innerHTML = factory.getUserHeader();
  main.prepend(photographerHeader);
}

async function renderMedias() {
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);
  await createSortedMediasCards();
  renderLightbox();
  renderLikeMedia();
}

async function renderSortedMedias() {
  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", async () => {
      document.querySelector(".photographer__content").remove();
      await renderMedias();
    })
  })
}

async function renderLikesCounter() {
  const photographer = await getPhotographersById();
  const medias = await getMediasByPhotographer();
  let totalLikes = 0;
  medias.forEach(media => {
    totalLikes += media.likes
  });
  const likesNb = document.querySelector(".likes");
  likesNb.innerText = totalLikes;
  const price = document.querySelector(".price");
  price.innerText = `${photographer.price}€ / jour`
}

async function renderLikeMedia() {
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
    lightboxImg.src = `../../ressources/assets/photographers/${photographerId}/${image}`;
    lightboxImg.alt = `${title} - closup view`;
    lightboxImg.classList.add("lightboxModal__img");
    figure.appendChild(lightboxImg);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = title;
    figure.appendChild(caption);

    lightbox.prepend(figure);

  } else if (media.video) {

    const figure = document.createElement("figure");
    figure.classList.add("lightboxModal__figure")

    const lightboxVideo = document.createElement("video");
    lightboxVideo.controls = "true";
    lightboxVideo.classList.add("lightboxModal__video")
    figure.appendChild(lightboxVideo);

    const lightboxVideoSrc = document.createElement("source");
    lightboxVideoSrc.src = `../../ressources/assets/photographers/${photographerId}/${video}`;
    lightboxVideoSrc.type = "video/mp4";
    lightboxVideo.appendChild(lightboxVideoSrc);

    const caption = document.createElement("figcaption");
    caption.classList.add("lightboxModal__caption");
    caption.innerText = title;
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
    return previousMediaId
  }
}

async function renderLightbox() {
  const mediaColl = document.querySelectorAll(".media");
  const medias = Array.from(mediaColl);
  medias.forEach(media => {
    media.firstChild.addEventListener("click", async () => {
      const mediaId = media.id
      initLightbox();
      renderMedia(mediaId);
      nextMediaWithArrow();
      previousMediaWithArrow();
    })
  })

  const next = document.querySelector(".lightboxModal__next");
  next.addEventListener("click", async () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      const nextId = await findNextMedia()
      renderMedia(nextId);
    }
  })

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

init();
