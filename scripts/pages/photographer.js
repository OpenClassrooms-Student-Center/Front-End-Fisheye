//Mettre le code JavaScript lié à la page photographer.html
const id = window.location.href.split("id=")[1];
//Méthode de récupération des données des photographes
async function getPhotographer() {
  try {
    //Récupération des données des photographes (Tout le fichier JSON)
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const photographers = await data.photographers;

    //Récupération des données du photographe avec filtre par photographe
    const photographerFiltered = photographers.filter(
      (photographer) => photographer.id == id
    );
    //Récupération des médias avec filtre des médias
    const mediaAll = await data.media;
    const mediaFiltered = mediaAll.filter(
      (media) => media.photographerId == id
    );

    return { photographerFiltered, mediaFiltered };
  } catch (error) {
    console.error(error);
  }
}

async function displayData(photographerFiltered, mediaFiltered) {
  const photographersSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media-section");

  photographerFiltered.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer, mediaFiltered);
    const userCardDOM = photographerModel.getUserDetail();
    const userLikes = photographerModel.getUserLikes();
    photographersSection.appendChild(userCardDOM);
    photographersSection.appendChild(userLikes);
  });
  mediaFiltered.forEach((media) => {
    const mediaModel = mediaFactory(media, photographerFiltered);
    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
}
async function init() {
  // Récupère les datas des photographes
  const { photographerFiltered, mediaFiltered } = await getPhotographer();
  displayData(photographerFiltered, mediaFiltered);
}

init();
