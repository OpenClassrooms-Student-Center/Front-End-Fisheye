//Mettre le code JavaScript lié à la page photographer.html
const id = window.location.href.split("id=")[1];
//Récupération des données des photographes
async function getPhotographer() {
  try {
    //Récupération des données des photographes (Tout le fichier JSON)
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const photographers = await data.photographers;

    //Récupération des données du photographe avec filtre par photographe
    const photographer = photographers.filter(
      (photographer) => photographer.id == id
    );
    //Récupération des médias avec filtre des médias
    const mediaAll = await data.media;
    const media = mediaAll.filter((media) => media.photographerId == id);

    return { photographer, media };
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographers, mediaAll) {
  const photographersSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media-section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserDetail();
    photographersSection.appendChild(userCardDOM);
  });
  mediaAll.forEach((media) => {
    const mediaModel = mediaFactory(media, photographers);
    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographer, media } = await getPhotographer();
  displayData(photographer, media);
}

init();
