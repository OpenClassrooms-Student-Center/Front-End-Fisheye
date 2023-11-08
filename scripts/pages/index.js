import { dbPhotographers } from '../db/dbPhotographers.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';

/**
 * Executé au chargement de la page d'accueil
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Fonction qui récupère la div qui doit contenir tous les photographes et les affiche
 */
function displayPhotographers(photographers) {
  try {
    const photographersSection = document.querySelector(
      '.photographers__section'
    );
    photographers.forEach((photographer) => {
      const card = photographerTemplate(photographer);
      const cardDOM = card.createPhotographerCard();
      photographersSection.appendChild(cardDOM);
    });
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Fonction appelée au chargement, récupère les datas des photographes
 */
async function init() {
  try {
    const datasPhotographers = dbPhotographers();
    const { photographers } = await datasPhotographers.getPhotographers();
    displayPhotographers(photographers);
  } catch (error) {
    console.log(error.message);
  }
}
