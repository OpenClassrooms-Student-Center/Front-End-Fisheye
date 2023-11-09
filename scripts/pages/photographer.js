/**
 * controller of photographer page
 */
import { DbPhotographers } from '../db/DbPhotographers.js';
import { PhotographerTemplate } from '../templates/PhotographerTemplate.js';
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
function displayPhotographerProfile(photographer) {
  try {
    const photographerMain = document.querySelector('.photographer__main');
    const photographerHeader = PhotographerTemplate(photographer);
    const photographerHeaderDOM =
      photographerHeader.createPhotographerProfile();
    photographerMain.insertBefore(
      photographerHeaderDOM,
      photographerMain.firstChild
    );
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Function called up on loading, retrieves photographer data according to id
 */
async function init() {
  try {
    let params = new URL(document.location).searchParams;
    const idPhotographer = params.get('id');
    const datasPhotographer = DbPhotographers();
    const photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    // if id is empty or doesn't exist in database --> home redirection
    if (photographer == null) {
      window.location.href = '../index.html';
    } else {
      displayPhotographerProfile(photographer);
    }
  } catch (error) {
    console.log(error.message);
  }
}
