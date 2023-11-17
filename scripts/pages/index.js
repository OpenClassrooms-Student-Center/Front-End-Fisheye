import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import { photographerCard } from "../templates/photographer.js";

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerCard(photographer);
    console.log(photographerModel);
    photographersSection.appendChild(photographerModel);
  });
}

async function init() {
  getAllorOnePhotographer().then(({ photographers }) => {
    displayData(photographers);
  });
}

init();
