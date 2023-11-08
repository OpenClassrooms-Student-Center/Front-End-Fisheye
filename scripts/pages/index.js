import { dbPhotographers } from '../db/dbPhotographers.js';
import { photographerTemplate } from '../templates/photographerTemplate.js';

/**
 * Executed when home page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing all the photographers and displays them
 */
const displayPhotographers = (photographers) => {
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
};

/**
 * Function called on loading, retrieves data from photographers database
 */
const init = async () => {
  try {
    const datasPhotographers = dbPhotographers();
    const { photographers } = await datasPhotographers.getPhotographers();
    displayPhotographers(photographers);
  } catch (error) {
    console.log(error.message);
  }
};
