//Mettre le code JavaScript lié à la page photographer.html
// Récupération de l'ID dans l'url
const id = window.location.href.split("id=")[1];
let photographerName = "";
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
  // Éléments du DOM
  const photographersSection = document.querySelector(".photograph-header");
  const mediaSection = document.querySelector(".media-section");

  if (photographersSection.children.length == 0) {
    photographerFiltered.forEach((photographer) => {
      const photographerModel = photographerFactory(
        photographer,
        mediaFiltered
      );
      const userCardDOM = photographerModel.getUserDetail();
      const userLikes = photographerModel.getUserLikes();
      photographersSection.appendChild(userCardDOM);
      photographersSection.appendChild(userLikes);
    });
  }
  mediaFiltered.forEach((media) => {
    const mediaModel = mediaFactory(media, photographerFiltered);
    const mediaCardDom = mediaModel.getMediaCardDom();
    mediaSection.appendChild(mediaCardDom);
  });
}
async function init(option) {
  // Récupère les datas des photographes
  const { photographerFiltered, mediaFiltered } = await getPhotographer();
  //  tri les médias (défaut: par date)
  switch (option) {
    case "popularité":
      mediaFiltered.sort((a, b) => b.likes - a.likes);
      break;
    case "titre":
      mediaFiltered.sort(function (a, b) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
      });
      break;
    case "date":
    default:
      mediaFiltered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }
  photographerFiltered.length == 0
    ? (window.location.href = "index.html")
    : displayData(photographerFiltered, mediaFiltered);
  photographerName = photographerFiltered[0].name;
}

init();
