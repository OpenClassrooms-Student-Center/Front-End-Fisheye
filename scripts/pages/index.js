import { URL } from "../../constants/index.js";
import { PhotographerCard } from "../components/photographerCard/index.js";
import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../services/getData.js";

async function getPhotographers() {
  const data = await getData(URL);
  return data;
}

async function displayData(photographers) {
  console.log("photographers => ", photographerFactory);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.map((photographer) => {
    const photographerModel = new PhotographerCard(photographer);
    console.log("photographerModel => ", photographerModel);

    const userCardDOM = photographerModel.createPhotographerCard();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const data = await getPhotographers();
  const { photographers } = data;
  // adding alt property to photographer object
  photographers.map((photographer) => (photographer.alt = photographer.name));

  console.log("photographers  => ", photographers);

  displayData(photographers);
}

init();
