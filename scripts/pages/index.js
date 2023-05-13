import { photographerFactory } from "./../factories/photographerFactory.js";
import { get_Datas } from "./../utils/get_datas.js";



// Affichage des elements de la page
function displayData(datas) {
  const photographersSection = document.querySelector(".photographer_section");

  datas.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await get_Datas(); // Récupère les photographes

  // Si vous êtes sur la page index.html, affichez les photographes
  if (document.querySelector(".photographer_section")) {
    displayData(photographers);
  }
}

init();


