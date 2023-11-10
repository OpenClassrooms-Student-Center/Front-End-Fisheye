/* eslint-disable no-unused-vars */

import { createImage, createElement } from './TemplateHelpers.js';
import { createPhotographer } from '../models/Photographer.js';
import { MediaFactory } from '../factories/MediaFactory.js';
/**
 * Vue of photographer's page
 * @param {object} photographer
 * @returns {html}
 */
function PhotographerTemplate(photographer) {
  // const { name, portrait, city, country, tagline } =
  //   createPhotographer(photographer);
  const { name, portrait, city, country, tagline, price } = photographer;
  // console.log(photographer);
  /**
   * Function that creates a div to display the photographer's profile
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
    const photographerProfile = `
      <section class="photographer__presentation">
        <h1 class="photographer__presentation-name name">${name}</h1>
        <h2 class="photographer__presentation-location location">${city}, ${country}</h2>
        <p class="photographer__presentation-tagline">${tagline}</p>
      </section>
      <button class="photographer__contact-button contact__button">Contactez-moi</button>
      <img class="photographer__profile-picture profile-picture" src="../assets/images/photographers/Photographers_ID_Photos/${portrait}" alt="${name}"></img>
  `;
    photographerHeader.innerHTML = photographerProfile;
    return photographerHeader;
  };

  // TODO create filter
  // TODO create gallery
  /**
   * Function that creates an article to display a photographer's image or video
   * @returns {html}
   */
  const createMediaCard = (media) => {
    const { title, description, src, likes } = MediaFactory(media);
    console.log(MediaFactory(media));
    // TODO manage type video or image
    // path to picture (only firstname is needed)
    const pictureNameRepository = name.split(' ')[0];
    const mediaPicture = `../assets/images/photographers/${pictureNameRepository}/${src}`;
    // article container
    const mediaArticle = document.createElement('article');
    mediaArticle.className = 'media-card';
    const mediaCard = `
      <a class="media-card__link" href="#">
        <img class="media-card__picture" src="${mediaPicture}" alt="${description}">
      </a>
      <div class="media-card__under-picture-container">
        <p class="media-card__title">${title}</p>
        <div class="media-card__likes-container">
          <p class="media-card__likes">${likes}</p>
          <button class="media-card__likes-button"><i class="fa-solid fa-heart media-card__likes-icon"></i></button>
        </div>
      </div>
  `;
    mediaArticle.innerHTML = mediaCard;
    return mediaArticle;
  };
  return { createPhotographerProfile, createMediaCard };
}

export { PhotographerTemplate };
