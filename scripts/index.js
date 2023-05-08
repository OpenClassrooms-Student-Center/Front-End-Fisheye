import {PhotographersModel} from "./models/photographersModel.js";

async function init() {
  let photographersModel = new PhotographersModel('data/photographers.json');

  const photographers = await photographersModel.getPhotographers();
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    photographersSection.appendChild(photographerFactory(photographer).getUserCardDOM());
  });
}

init();
