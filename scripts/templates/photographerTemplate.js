/* eslint-disable no-unused-vars */

import { createImage, createElement } from './TemplateHelpers.js';
import { createPhotographer } from '../models/Photographer.js';
import { MediaFactory } from '../factories/MediaFactory.js';
/**
 * Vue of photographer's page
 * @param {object} photographer
 * @returns
 */
function PhotographerTemplate(photographer) {
  // const { name, portrait, city, country, tagline } =
  //   createPhotographer(photographer);
  const { name, portrait, city, country, tagline, price } = photographer;
  console.log(photographer);
  /**
   * Function that creates a div to display the photographer's profile
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
  /**
   * Function that creates an article to display a photographer's image or video
   * and returns a div containing several DOM elements (a, img, p, div, p, i)
   *    Media is composed of :
   *       <a>
   *        <img>
   *       </a>
   *       <div>
   *        <p> title
   *        <div>
   *          <p>number of likes
   *          <icon> heart icon
   *        </div>
   * @returns
   */
  const createMediaCard = (media) => {
    const { title, description, src, likes } = MediaFactory(media);
    console.log(media);

    // article container
    const mediaCard = document.createElement('article');
    mediaCard.className = 'photographer__gallery-media';
    // media link container
    const mediaCardLink = createElement(
      'a',
      'photographer__gallery-media-link'
    );
    mediaCardLink.setAttribute('href', `#`);
    // picture
    // TODO video or image
    const nameRepository = name.split(' ')[0];
    console.log(nameRepository);
    const mediaPicture = `../assets/photographers/${nameRepository}/${src}`;
    const mediaCardPicture = createImage(
      mediaPicture,
      'photographer__gallery-media-picture',
      description
    );
    // add picture to media link
    mediaCardLink.appendChild(mediaCardPicture);
    // container under picture
    const photographerUnderPictureContainer = createElement(
      'div',
      'photographer__gallery-media-under-picture-container'
    );
    // title
    const mediaCardTitle = createElement(
      'p',
      'photographer__gallery-media-title',
      title
    );
    // number of likes container
    const mediaCardLikesContainer = createElement(
      'div',
      'photographer__gallery-media-likes-container'
    );
    const mediaCardLikes = createElement(
      'p',
      'photographer__gallery-media-likes',
      likes
    );
    const mediaCardLikesIcon = createElement(
      'i',
      'photographer__gallery-media-likes-icon',
      '<3'
    );
    // add number of likes and icon to mediaCardLikesContainer container
    mediaCardLikesContainer.appendChild(mediaCardLikes);
    mediaCardLikesContainer.appendChild(mediaCardLikesIcon);
    // add title and likes container to photographerUnderPictureContainer container
    photographerUnderPictureContainer.appendChild(mediaCardTitle);
    photographerUnderPictureContainer.appendChild(mediaCardLikesContainer);

    // add mediaCardLink and picturemediaCardLikesContainer to article container
    mediaCard.appendChild(mediaCardLink);
    mediaCard.appendChild(photographerUnderPictureContainer);

    return mediaCard;
  };
  return { createPhotographerProfile, createMediaCard };
}

export { PhotographerTemplate };
