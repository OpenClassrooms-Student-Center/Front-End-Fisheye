import { URL } from "../../constants/index.js";
import { PhotographerCard } from "../components/photographerCard/index.js";
import { getData } from "../services/getData.js";

/**
 * Get the data for the photographers
 * @returns {Promise} data
 */
async function getPhotographers() {
  const data = await getData(URL);
  return data;
}

/**
 * Display photgrapher Card Infos
 * @param {Collection} photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.map((photographer) => {
    const photographerModel = new PhotographerCard(photographer);
    const userCardDOM = photographerModel.createPhotographerCard();

    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Get data and display information
 */
async function init() {
  // Récupère les datas des photographes
  const data = await getPhotographers();
  const { photographers } = data;
  // adding alt property to photographer object
  photographers.map((photographer) => (photographer.alt = photographer.name));
  displayData(photographers);
}

init();
