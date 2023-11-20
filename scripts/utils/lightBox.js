/*********************************************************************************
*
* This file contains all the functions required to manage modal media lightBox
*
/*********************************************************************************/
import { createPhotographerLightBox } from '../templates/photographerLightBoxTemplate.js';
import { mediaFactory } from '../models/factories/MediaFactory.js';

/**
 * initialization of lightbox
 * @param {string} pictureNameRepository
 * @param {object} media
 * @param {array<object>} medias
 */
const initLightBox = (pictureNameRepository, media, medias) => {
  createPhotographerLightBox(pictureNameRepository, media);
  const modal = document.getElementById('modal__lightbox');
  const previousCarouselMedia = document.querySelector(
    '.modal__lightbox-carousel-previous'
  );
  const nextCarouselMedia = document.querySelector(
    '.modal__lightbox-carousel-next'
  );
  previousCarouselMedia.addEventListener('click', () => {
    media = manageCarousel().previousMedia;
    createPhotographerLightBox(pictureNameRepository, media);
  });
  nextCarouselMedia.addEventListener('click', () => {
    media = manageCarousel().nextMedia;
    createPhotographerLightBox(pictureNameRepository, media);
  });

  // accessibility with key
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
        media = manageCarousel().previousMedia;
        createPhotographerLightBox(pictureNameRepository, media);
      }
      if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
        media = manageCarousel().nextMedia;
        createPhotographerLightBox(pictureNameRepository, media);
      }
    }
  });

  /**
   * manage media to display depends of its index
   * @returns object
   */
  const manageCarousel = () => {
    try {
      let idMedia = media.id;
      let mediaIndex = medias.findIndex((media) => media.id === idMedia);
      let previousMedia;
      let nextMedia;
      if (mediaIndex === 0) {
        // if this is the first media in the list, then the previous media will be the last media
        previousMedia = mediaFactory(medias[medias.length - 1]);
      } else {
        previousMedia = mediaFactory(medias[mediaIndex - 1]);
      }
      if (mediaIndex === medias.length - 1) {
        // if it's the last media in the list, then the next media will be the first media
        nextMedia = mediaFactory(medias[0]);
      } else {
        nextMedia = mediaFactory(medias[mediaIndex + 1]);
      }
      return { previousMedia, nextMedia };
    } catch (error) {
      console.log(error.message);
    }
  };
};

export { initLightBox };
