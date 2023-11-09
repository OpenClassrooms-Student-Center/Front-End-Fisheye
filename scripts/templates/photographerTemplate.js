/* eslint-disable no-unused-vars */

import { createImage, createElement } from './TemplateHelpers.js';
import { createPhotographer } from '../models/Photographer.js';
/**
 * Vue of photographer's page
 * @param {object} photographer
 * @returns
 */
function PhotographerTemplate(photographer) {
  // const { name, portrait, city, country, tagline } =
  //   createPhotographer(photographer);
  const { name, portrait, city, country, tagline, price, id } = photographer;
  console.log(photographer);
  /**
   * Function that creates an div to display the photographer's profile
   * and returns a div containing several DOM elements (a, img, h2, div, p)
   *    Profile is composed of :
   *       a presentation containing :
   *          photographer's name
   *          location (city + country)
   *          tagline
   *       a button contact
   *       a profile picture
   * @returns
   */
  const createPhotographerProfile = () => {
    // div container
    const photographerHeader = document.createElement('div');
    photographerHeader.className = 'photographer__header';
    photographerHeader.setAttribute(
      'aria-label',
      `Entête de la page de ${name}`
    );
    // presentation container
    const photographerPresentation = document.createElement('section');
    photographerPresentation.className = 'photographer__presentation';
    // name
    // photographer name
    const photographerName = createElement(
      'h1',
      'photographer__presentation-name name',
      name
    );
    // location
    const photographerLocation = createElement(
      'h2',
      'photographer__presentation-location location',
      `${city}, ${country}`
    );
    // tagline
    const photographerTagline = createElement(
      'p',
      'photographer__presentation-tagline',
      tagline
    );

    // add elements to presentation container
    photographerPresentation.appendChild(photographerName);
    photographerPresentation.appendChild(photographerLocation);
    photographerPresentation.appendChild(photographerTagline);

    // contact button
    const photographerContactButton = createElement(
      'button',
      'photographer__contact-button contact__button',
      'Contactez-moi'
    );
    photographerContactButton.onclick = 'displayModal()';
    // profile picture
    // get photographer profile picture
    const picture = `../assets/photographers/Photographers_ID_Photos/${portrait}`;
    const alt = name ?? '';
    const photographerProfilePicture = createImage(
      picture,
      'photographer__profile-picture profile-picture',
      alt
    );
    // add elements to photographer header container
    photographerHeader.appendChild(photographerPresentation);
    photographerHeader.appendChild(photographerContactButton);
    photographerHeader.appendChild(photographerProfilePicture);
    return photographerHeader;
  };
  // TODO create filter
  // TODO create gallery
  return { createPhotographerProfile };
}

export { PhotographerTemplate };
