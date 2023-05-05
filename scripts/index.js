import {PhotographersModel} from "./models/photographersModel.js";

async function init() {
  let photographersModel = new PhotographersModel();

  const photographers = await photographersModel.getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    photographersSection.appendChild(photographerFactory(photographer).getUserCardDOM());
  });
}

init();
