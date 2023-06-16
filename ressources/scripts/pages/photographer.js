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

// utilisation de photographerFactory pour créer le header en fonction du photographe sélectionné
async function renderHeader() {
  const photographerHeader = document.createElement("section");
  photographerHeader.classList.add("photographer__header");
  photographerHeader.innerHTML = factory.getUserHeader();
  main.prepend(photographerHeader);
}

// affichage des médias triés ainsi que du nombre de like total par photographe
async function renderMedias() {
  const mediaSection = document.createElement("section");
  mediaSection.classList.add("photographer__content");
  main.appendChild(mediaSection);
  await createSortedMediasCards();
  renderLightbox();
  renderLikeMedia();
}

// appel de la fonction renderMedias() au click sur une option de tri
async function renderSortedMedias() {
  const options = document.querySelectorAll(".sort__option");
  options.forEach(option => {
    option.addEventListener("click", async () => {
      document.querySelector(".photographer__content").remove();
      await renderMedias();
    })
  })
}

// affichage du nombre total de likes des médias par photographe
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

// fonction qui permet de liker/déliker un média, avec impact sur l'icon et sur le nombre de like du média
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

// fonction qui permet de mettre à jour le nombre total de like
function updateLikes() {
  const likes = document.querySelectorAll(".media__likeNumber");
  const totalLikes = document.querySelector(".likes");
  let total = 0
  likes.forEach(like => total += parseInt(like.textContent));
  totalLikes.textContent = total
}

// fonction qui récupère le media en fonction de son id grâce au mediaId passé en argument. Création d'une figure en fonction de si le media est une image ou une vidéo, et affichage de cette figure dans la lightbox
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
    lightboxImg.src = `./ressources/assets/photographers/${photographerId}/${image}`;
    lightboxImg.alt = `${title} - close-up view`;
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
    lightboxVideoSrc.src = `/ressources/assets/photographers/${photographerId}/${video}`;
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

// fonction qui retourne l'index suivant l'index du média actuel
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

// fonction qui retourne l'index précédent l'index du média actuel
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

// appel des différentes fonctions nécessaires au bon comportement et à l'affichage de la lightbox lorsque l'on clique sur un média
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

  // affichage du média suivant au click sur le bouton suivant
  const next = document.querySelector(".lightboxModal__next");
  next.addEventListener("click", async () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      const nextId = await findNextMedia()
      renderMedia(nextId);
    }
  })

  // affichage du média précedent au click sur le bouton précedent
  const previous = document.querySelector(".lightboxModal__previous");
  previous.addEventListener("click", async () => {
    if (document.querySelector(".lightboxModal__figure")) {
      document.querySelector(".lightboxModal__figure").remove()
      const previousId = await findPreviousMedia()
      renderMedia(previousId);
    }
  })
}

// fonction qui permet à l'utilisateur de naviguer entre les médias dans la lightbox à l'aide de la touche droite du clavier
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

// fonction qui permet à l'utilisateur de naviguer entre les médias dans la lightbox à l'aide de la touche gauche du clavier
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
