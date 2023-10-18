import {
  photographInfoTemplate,
  photographPicture,
  mediasTemplate,
} from "../templates/photographer.js";

export async function getDataPhotographers() {
  const dataPhotographers = await fetch("../../data/photographers.json");
  return dataPhotographers.json();
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

function displayMedias(photographer, medias) {
  const sectionMedia = document.querySelector(".media");

  medias
    .filter((media) => media.photographerId == photographer.id)
    .forEach((media) => {
      const mediaModel = mediasTemplate(media);
      sectionMedia.appendChild(mediaModel);
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
  displayMedias(photographer.id, media);
}

init();
