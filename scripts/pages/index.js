import { photographerFactory } from "../factories/photographerFactory.js";

async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  let response = await fetch("../data/photographers.json");
  // et bien retourner le tableau photographers seulement une fois récupéré
  const photographers = await response.json();
  return photographers;
}


// Affichage des elements de la page
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  const photographerspagesection = document.querySelector(".photograph-header");

  photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les photographes
  const { photographers } = await getPhotographers();

  // Si vous êtes sur la page index.html, affichez les photographes
  if (document.querySelector(".photographer_section")) {
    displayData(photographers);
  }
  
};
init();



export { getPhotographers };