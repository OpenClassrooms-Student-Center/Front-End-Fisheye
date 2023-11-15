/* eslint-disable no-unused-vars */

/**
 * controller of photographer page
 */
import { ApiPhotographers } from '../models/api/ApiPhotographers.js';
import { ApiMedia } from '../models/api/ApiMedia.js';
import { createPhotographer } from '../models/metier/Photographer.js';
import { mediaFactory } from '../models/factories/MediaFactory.js';

import { createPhotographerProfile } from '../templates/photographerProfileTemplate.js';
import { createPhotographerMediaCard } from '../templates/photographerMediaCardTemplate.js';
import { createPhotographerInfos } from '../templates/photographerInfosTemplate.js';

import { initModal } from '../utils/modal.js';

/**
 * Executed when photographer page is loaded
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
    const photographerMain = document.querySelector('.main');
    const photographerProfileDOM = createPhotographerProfile(photographer);
    photographerMain.insertBefore(
      photographerProfileDOM,
      photographerMain.firstChild
    );
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data
 * @param {array} photographer
 */
const displayPhotographerGallery = (medias, pictureNameRepository) => {
  try {
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );

    medias.forEach((media) => {
      media = mediaFactory(media);
      const mediaArticleDOM = createPhotographerMediaCard(
        media,
        pictureNameRepository
      );
      photographerGallery.appendChild(mediaArticleDOM);
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Function that retrieves the div containing the photographer's infos (total likes + daily rate)
 * @param {array} photographer
 */
const displayPhotographerInfos = (photographer) => {
  try {
    const photographerMain = document.querySelector('.main');
    const photographerInfosDOM = createPhotographerInfos(photographer);
    photographerMain.appendChild(photographerInfosDOM);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Function that manage contact form modal
 * @param {array} photographer
 */
const manageContactFormModal = (photographer) => {
  try {
    const openContactModalBtn = document.querySelector(
      '.modal__contact-open-button'
    );
    // display name on modal title
    const nameTitle = document.getElementById(
      'modal__contact-photographer-name'
    );
    nameTitle.textContent = `${photographer.name}`;
    let modalForm = initModal('modal__contact', photographer);
    openContactModalBtn.addEventListener('click', () => {
      modalForm.displayModal();
    });
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * Function that manage contact form modal
 * @param {array} photographer
 */
const manageMediaLightBox = (photographer, medias, pictureNameRepository) => {
  try {
    medias.forEach((media) => {
      media = mediaFactory(media);
      const mediaId = media.id;
      const openLightBoxModalBtn = document.getElementById(
        `media-card-${mediaId}`
      );
      let modalLightBox = initModal(
        'modal__lightbox',
        photographer,
        media,
        pictureNameRepository,
        medias
      );
      openLightBoxModalBtn.addEventListener('click', () => {
        modalLightBox.displayModal();
      });
    });
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
    const datasPhotographer = ApiPhotographers();
    let photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    // if id is empty or doesn't exist in database --> home redirection
    if (!photographer) {
      window.location.href = '../index.html';
    } else {
      photographer = createPhotographer(photographer);
      console.log(photographer);
      const datasMedia = ApiMedia();
      const medias = await datasMedia.getMediasByPhotographerId(idPhotographer);
      console.log(medias);
      // path to picture (only firstname is needed)
      const pictureNameRepository = photographer.name.split(' ')[0];
      displayPhotographerProfile(photographer);
      displayPhotographerGallery(medias, pictureNameRepository);
      displayPhotographerInfos(photographer);
      manageContactFormModal(photographer);
      manageMediaLightBox(photographer, medias, pictureNameRepository);
    }
  } catch (error) {
    console.log(error.message);
  }
};
