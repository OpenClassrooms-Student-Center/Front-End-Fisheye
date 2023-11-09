/* eslint-disable no-unused-vars */

import { createImage, createElement } from './TemplateHelpers.js';
import { createPhotographer } from '../models/Photographer.js';

/**
 * Vue of home page
 * Function that takes a photographer as parameter
 * @param {object} photographer
 * @returns
 */
function IndexTemplate(photographer) {
  // const { name, portrait, city, country, tagline, price, id } =
  //   createPhotographer(photographer);
  const { name, portrait, city, country, tagline, price, id } = photographer;
  console.log(photographer);
  /**
   * Function that creates an article to display the photographer's card
   * and returns an article containing several DOM elements (a, img, h2, div, p)
   *    A card is contained in an article composed of :
   *        a link containing :
   *            profile picture
   *            photographer's name
   *        a description containing :
   *            location (city + country)
   *            tagline
   *            daily rate
   * @returns
   */
  const createPhotographerCard = () => {
    // article container
    const article = document.createElement('article');
    article.className = 'photographer';
    // link to profil page (img + name)
    const photographerPageLink = createElement('a', 'photographer__link');
    photographerPageLink.setAttribute(
      'href',
      `./pages/photographer.html?id=${id}`
    );
    // profile picture
    // get photographer profile picture
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
    const profilePicture = createImage(
      picture,
      'photographer__profile-picture profile-picture',
      `Profil de ${name}`
    );
    // photographer name
    const photographerName = createElement(
      'h2',
      'photographer__name name',
      name
    );

    photographerPageLink.appendChild(profilePicture);
    photographerPageLink.appendChild(photographerName);

    // description container (location, tagline, price)
    const photographerDescription = document.createElement('div');
    // location
    const photographerLocation = createElement(
      'p',
      'photographer__location location',
      `${city}, ${country}`
    );
    // tagline
    const photographerTagline = createElement(
      'p',
      'photographer__tagline',
      tagline
    );
    // price
    const photographerPrice = createElement(
      'p',
      'photographer__price',
      `${price}€/jour`
    );

    photographerDescription.appendChild(photographerLocation);
    photographerDescription.appendChild(photographerTagline);
    photographerDescription.appendChild(photographerPrice);
    // add all childs to article
    article.appendChild(photographerPageLink);
    article.appendChild(photographerDescription);

    return article;
  };

  return { createPhotographerCard };
}

export { IndexTemplate };
