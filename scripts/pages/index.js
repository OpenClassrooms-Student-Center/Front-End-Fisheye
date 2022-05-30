import { URL } from "../../constants/index.js";
import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../services/getData.js";

async function getPhotographers() {
  const data = await getData(URL);
  return data;
}

async function displayData(photographers) {
  console.log("photographers => ", photographerFactory);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    console.log("photographerModel => ", photographerModel);

    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const data = await getPhotographers();
  console.log("data => ", data.photographers);

  displayData(data.photographers);
}

init();
