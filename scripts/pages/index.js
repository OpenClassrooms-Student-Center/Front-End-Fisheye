/**
 * controller of home page
 */
import { ApiPhotographers } from '../models/api/ApiPhotographers.js';
import { createPhotographerCard } from '../templates/indexPhotographerCardTemplate.js';
import { Photographer } from '../models/metier/Photographer.js';

/**
 * Executed when home page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing all the photographers and displays them
 * @param {array} photographers
 */
const displayPhotographers = (photographers) => {
  try {
    const photographersSection = document.querySelector(
      '.photographers__section'
    );
    photographers.forEach((photographer) => {
      photographer = Photographer(photographer);
      console.log(photographer);
      const cardDOM = createPhotographerCard(photographer);
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
    const datasPhotographers = ApiPhotographers();
    const { photographers } = await datasPhotographers.getPhotographers();
    displayPhotographers(photographers);
  } catch (error) {
    console.log(error.message);
  }
};
