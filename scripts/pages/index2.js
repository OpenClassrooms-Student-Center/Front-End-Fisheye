import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
  //récupération des photographes
  const photographersResponse = await fetch("photographers.json");
  const photographersData = await photographersResponse.json();

  return photographersData;
}

async function displayData(photographers) {
  //création de la section photographes
  const photographersSection = document.querySelector(".photographer_section");

  //boucle sur le json
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    //ajout des éléments à la classe "photographer_section"
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
    console.log(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
