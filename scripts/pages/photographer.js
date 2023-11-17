import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import { mediaCard, photographerHero } from "../templates/photographer.js";

async function changeFilter(sort, id, photographerFirstName) {
  console.log("changeFilter", sort, id);
  const medias = await getAllorOnePhotographer(id).then(({ photographers }) => {
    return photographers[0].media;
  });
  console.log("medias", medias);
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
  const { name: photographerFirstName } = await photographers[0];

  filter.addEventListener("change", (event) => {
    changeFilter(event.target.value, id, getFirstName(photographerFirstName));
  });

  displayPhotographer(photographers[0]);
  displayMedia(photographers[0]?.media, getFirstName(photographerFirstName));
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

async function displayPhotographer(photographer) {
  const photographInfoSection = document.querySelector(".photograph-infos");
  const photographPicture = document.querySelector(".photograph-picture");

  const photographerData = photographerHero(photographer);
  photographInfoSection.appendChild(photographerData.userInfos);
  photographPicture.appendChild(photographerData.userPicture);
}

async function displayMedia(medias, firstName) {

  const mediaSection = document.querySelector(".media-section");
  mediaSection.innerHTML = "";

  medias?.forEach((media) => {
    mediaSection.appendChild(mediaCard(media, firstName));
  });
}

init();
