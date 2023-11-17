import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import {
  likeContainer,
  mediaCard,
  photographerHero,
} from "../templates/photographer.js";

let allLikes;

async function changeFilter(sort, id, photographerFirstName) {
  const medias = await getAllorOnePhotographer(id).then(({ photographers }) => {
    return photographers[0].media;
  });

  const mediaSort = await getMedia(medias, sort);

  displayMedia(mediaSort, photographerFirstName);
}

function displayLightbox() {
  lightbox.style.display = "block";
}

async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));
  const filter = document.querySelector("#filter");

  const { photographers } = await getAllorOnePhotographer(id);
  const { name: photographerFirstName, media } = await photographers[0];

  filter.addEventListener("change", (event) => {
    changeFilter(event.target.value, id, getFirstName(photographerFirstName));
  });

  allLikes = media.reduce((total, media) => total + media.likes, 0);

  const photographersWithAllLikes = {
    ...photographers[0],
    allLikes: allLikes,
  }

  displayPhotographer(photographersWithAllLikes);
  displayMedia(media, getFirstName(photographerFirstName));
  displayLikeCounter(photographersWithAllLikes);
}

function getFirstName(photographerFirstName) {
  const firstName = photographerFirstName.split(" ")[0].replace("-", " ");
  return firstName;
}

async function getMedia(media, sort = "popularite") {
  switch (sort) {
    case "popularite":
      media.sort((a, b) => b.likes - a.likes);
      break;
    case "Date":
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "Titre":
      media.sort((a, b) => (a.title > b.title ? 1 : -1));
      break;
  }

  return media;
}

function displayPhotographer(photographer) {
  const photographInfoSection = document.querySelector(".photograph-infos");
  const photographPicture = document.querySelector(".photograph-picture");

  const { userInfos, userPicture } = photographerHero(photographer);
  photographInfoSection.appendChild(userInfos);
  photographPicture.appendChild(userPicture);
}

function displayMedia(medias, firstName) {
  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";

  medias?.forEach((media) => {
    mediaSection.appendChild(mediaCard(media, firstName));
  });
}

function displayLikeCounter({allLikes, price}) {
  likeContainer(allLikes, price);
}

init();