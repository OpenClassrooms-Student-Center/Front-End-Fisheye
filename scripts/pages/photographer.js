import { dbPhotographers } from '../db/dbPhotographers.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';
/**
 * Executed when home page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data
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
 * Function called up on loading, retrieves photographer data according to id
 */
const init = async () => {
  try {
    let params = new URL(document.location).searchParams;
    const idPhotographer = params.get('id');
    //TODO gerer l'absence d'id
    const datasPhotographer = dbPhotographers();
    const photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    displayPhotographerProfile(photographer);
  } catch (error) {
    console.log(error.message);
  }
};
