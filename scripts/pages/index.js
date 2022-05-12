import createPhotographer from '../model/photographer.js';

async function getPhotographers() {
  return fetch('../data/photographers.json')
    .then((res) => res.json());
}
async function displayData(photographers) {
  photographers.forEach((photographer) => {
    createPhotographer(photographer);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
