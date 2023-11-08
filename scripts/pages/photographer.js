import { dbPhotographers } from '../db/dbPhotographers.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';
/**
 * Executé au chargement de la page d'un photographe
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Fonction qui récupère la div qui doit contenir l'entête de la page du photographe
 * et affiche les données du profil
 * @param {array} photographer
 */
const displayPhotographerProfile = (photographer) => {
  try {
    const photographerMain = document.querySelector('.photographer__main');
    const photographerHeader = photographerTemplate(photographer);
    const photographerHeaderDOM =
      photographerHeader.createPhotographerProfile();
    photographerMain.insertBefore(
      photographerHeaderDOM,
      photographerMain.firstChild
    );
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Fonction appelée au chargement, récupère les datas d'un photographe selon son id'
 */
async function init() {
  try {
    let params = new URL(document.location).searchParams;
    const idPhotographer = params.get('id');
    const datasPhotographer = dbPhotographers();
    const photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    displayPhotographerProfile(photographer);
  } catch (error) {
    console.log(error.message);
  }
}
