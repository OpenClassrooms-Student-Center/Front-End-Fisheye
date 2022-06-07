const profilMedia = document.querySelector("#profil__media");

let typeSort = ""; // Type de tri des média
let listMediaId = []; //Variable qui va permttre le filtre avec la list des ID des médias
let allLikes = 0; // Tout les likes des médias

//Obtenir l'ID du photographe pour charger les données
function getParamsUrl(url) {
  let string = url.search;
  return string.substring(3);
}
const idUser = getParamsUrl(window.location);

async function setData() {
  let response = await fetch("../data/photographers.json");
  if (!response.ok) {
    return "error";
  }
  let data = await response.json();

  let photographer = data.photographers.find((element) => element.id == idUser);
  let media = data.media.filter((m) => m.photographerId == idUser);

  setDataInHtml(photographer, media);
}
setData();

function setDataInHtml(photographer, media) {
  setProfilHeader(photographer);
  setProfilMedia(media);
  setSectionInfo(photographer, media);
}


//Mettre info dans la presentation du photographe
function setProfilHeader(photographer) {
  document.getElementById(
    "modalTitle"
  ).innerHTML = `Contactez-moi<br>${photographer.name}`;
  document.getElementById("profilName").innerText = photographer.name;
  document.getElementById(
    "profilLocation"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.getElementById("profilTagline").innerText = photographer.tagline;

  document.getElementById(
    "profilImage"
  ).src = `assets/photographers/${photographer.portrait}`;
}
