import {
  photographInfoTemplate,
  photographPicture,
  mediasTemplate,
} from "../templates/photographer.js";

async function getDataPhotographers() {
  const dataPhotographers = await fetch("../../data/photographers.json");
  return dataPhotographers.json();
}

export function getPhotographersMedia() {
  const { media, photographers } = getDataPhotographers();
  let photographerName;

  const mediasByPhotographers = media.filter(
    (media) => media.photographerId == photographers.id
  );

  if (mediasByPhotographers === photographerId) {
    switch (photographerId) {
      case "243":
        photographerName = "Mimi";
        break;
      case "930":
        photographerName = "Ellie Rose";
        break;
      case "82":
        photographerName = "Tracy";
        break;
      case "527":
        photographerName = "Nabeel";
        break;
      case "925":
        photographerName = "Rhode";
        break;
      case "195":
        photographerName = "Marcel";
        break;
    }
    return photographerName;
  }
}

function displayInfo(photographer) {
  const photographerInfo = document.querySelector(".photograph-info");
  const photographerPictureSection = document.querySelector(
    ".photograph-profilephoto"
  );

  const photographerModel = photographInfoTemplate(photographer);
  const userCardInfoDOM = photographerModel.getUserInfoDOM();
  const photographerPicture = photographPicture(photographer);
  const userPicture = photographerPicture.getUserPicture();

  photographerInfo.appendChild(userCardInfoDOM);
  photographerPictureSection.appendChild(userPicture);
}

function displayMedia(media) {
  const sectionMedia = document.querySelector(".media");
  const mediaItem = media.photographerId;

  const mediaModel = mediasTemplate(mediaItem);
  sectionMedia.appendChild(mediaModel);
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    console.log(userCardDOM);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes selon leur id
  const { photographers, media } = await getDataPhotographers();

  const param = new URLSearchParams(document.location.search);
  const id = param.get("id");
  let photographer;

  if (!id) {
    console.error("missing id parameter");
    return;
  }

  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      photographer = photographers[i];
    }
  }

  displayInfo(photographer);
  displayMedia(media);
}

init();
