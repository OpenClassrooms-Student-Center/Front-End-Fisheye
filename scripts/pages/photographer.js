import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import {
  photographerHero,
} from "../templates/photographer.js";
import { medias, displayLikesContainer } from "../templates/media.js";

async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));


  const { photographers } = await getAllorOnePhotographer(id);
  const photographer = photographers[0];
  
  const allLikes = photographer.media.reduce((total, media) => total + media.likes, 0);
  
  const allMedias = {
    allMedias: photographer.media,
    firstName: getFirstName(photographer.name),
    photographerPrice: photographer.price,
    allLikes: allLikes
  };
  

  displayPhotographer(photographers[0]);
  medias(allMedias);
  displayLikesContainer(allLikes, photographers[0].price);
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

init();