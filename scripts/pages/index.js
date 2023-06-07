import photographerFactory from '../factories/photographerFactory.js';
import { getDatas } from '../utils/utils.js';

/**
 * Affiche les données sur la page.
 * @function
 * @param {Array} datas - Les données à afficher.
 */
function displayData(datas) {
  const photographersSection = document.querySelector('.photographer_section');

  datas.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Fonction d'initialisation.
 * @async
 */
async function init() {
  const { photographers } = await getDatas(); // Récupère les photographes

  // Si vous êtes sur la page index.html, affichez les photographes
  if (document.querySelector('.photographer_section')) {
    displayData(photographers);
  }
}

init();
