let photographerName = "";
let photosFromJSON = "";
/**
 * Récupération de l'id du photographe depuis l'url
 */
function getPhotographerId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')

    return id;
}

/**
 * Récupération des données du photographe depuis le fichier JSON
 */
async function getPhotographerInfos(idPhotographer) {
    const photographers = await getJSON();

    const dataPhotographer = photographers.photographers.filter(photographers => photographers.id == idPhotographer);

    photographerName = dataPhotographer[0].name;

    return dataPhotographer[0];
}

/** 
 * Affichage des données du photographe
*/
async function displayInfos(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");

    const photographerModel = photographerTemplate(photographer);
    console.log(photographerModel);
    const userCardDOM = photographerModel.getPhotographerDataDOM();
    photographerHeader.appendChild(userCardDOM);
};

/**
 * recupère les données du fichier JSON
 */
async function getJSON() {
  const reponse = await fetch("data/photographers.json");
  const photographers = await reponse.json();
  return photographers;
}

async function init() { 

  const id = getPhotographerId();

  const data = await getPhotographerInfos(id);
  displayInfos(data);
};

init();