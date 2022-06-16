import { URL } from "../../constants/index.js";
import { AsideLikes } from "../components/asideLikes/index.js";
import { Filter } from "../components/filter/index.js";
import { PhotographerProfilHeader } from "../components/photographerProfile/index.js";
import { MediasFactory } from "../factories/photographerMediaFactory.js";
import { getData } from "../services/getData.js";

const data = await getData(URL);
const id = parseInt(new URLSearchParams(location.search).get("photographer"));
const { photographers } = data;

const currentPhotographer = photographers.find(
  (photographer) => photographer.id === id
);
// console.log("ID => ", id);
const PhotographerProfil = async (data, id) => {
  console.log("CurrentPhotgrapher => ", currentPhotographer);
  const sectionHeaderPhotographer = document.querySelector(
    ".section-photographe"
  );
  const photographeCardHeader = new PhotographerProfilHeader(
    currentPhotographer
  );

  sectionHeaderPhotographer.innerHTML =
    photographeCardHeader.createUserProfil();
};

const generateMediaFilter = () => {
  const section = document.querySelector(".filter");
  const mediaFilter = new Filter();
  section.innerHTML = mediaFilter.createDropListFilter();
};

/**
 *
 */
const implementTotalLikes = () => {
  const globalLikes = document.querySelector(".globalLikes");
  const mediaLikes = document.querySelectorAll(".likes");
  let likes = 0;
  mediaLikes.forEach((element) => {
    console.log("element ==> ", element);
    likes = likes + parseInt(element.innerText);
    console.log("element likes  ==> ", likes);
  });
  console.log("global likes ::: ", globalLikes);
  globalLikes.innerText = likes;
};

/**
 * Get the likes for each media of the currentPhotographer
 * @param {Single media} media
 */
const individualLikesCount = (media) => {
  const likeButton = document.getElementById(media.id);
  console.log("media liked :::>", media);
  if (media.liked === "true") {
    likeButton.checked = true;
  }
  let nbLikes = parseInt(media.likes);

  // Keyboard event
  likeButton.parentElement.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      likeButton.click();
      e.preventDefault();
    }
  });

  likeButton.addEventListener("change", () => {
    if (media.liked === undefined || media.liked === "false") {
      nbLikes += 1;
      media.liked = "true";
      likeButton.parentElement.setAttribute("aria-label", "liké");
    } else {
      nbLikes -= 1;
      media.liked = "false";
    }

    // redefine the number of media likes
    media.likes = nbLikes;
    likeButton.parentElement.previousElementSibling.textContent = nbLikes;
    implementTotalLikes();
  });
};

const displayGlobalLikes = () => {
  const { media: medias } = data;
  const currentMedias = medias.filter((media) => media.photographerId === id);
  const main = document.getElementById("main");
  const globalCount = new AsideLikes(currentMedias, currentPhotographer);
  main.appendChild(globalCount.createAsideLikes());
};

const generatePhotographerMedias = (currentMedias, currentPhotographer) => {
  const portfolioBlock = document.querySelector(".portfolio");
  portfolioBlock.innerHTML = "";
  currentMedias.forEach((media) => {
    const photoCardDOM = new MediasFactory(media, currentPhotographer.name);
    portfolioBlock.appendChild(photoCardDOM.buildMediaCard());
    individualLikesCount(media);
  });
};

const initMedias = async () => {
  const { media: medias } = data;
  const currentMedias = medias.filter((media) => media.photographerId === id);

  PhotographerProfil(data, id);
  generateMediaFilter();
  generatePhotographerMedias(currentMedias, currentPhotographer);
  displayGlobalLikes();
};

initMedias();
