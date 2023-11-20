/* eslint-disable no-unused-vars */

/**
 * controller of photographer page
 */
import { ApiPhotographers } from '../models/api/ApiPhotographers.js';
import { ApiMedia } from '../models/api/ApiMedia.js';
import { Photographer } from '../models/metier/Photographer.js';
import { mediaFactory } from '../models/factories/MediaFactory.js';

import { createPhotographerProfile } from '../templates/photographerProfileTemplate.js';
import { createPhotographerMediaCard } from '../templates/photographerMediaCardTemplate.js';
import { createPhotographerInfos } from '../templates/photographerInfosTemplate.js';

import { initModal } from '../utils/modal.js';
import { manageGallerySorted } from '../utils/sort.js';

/**
 * Executed when photographer page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data
 * @param {object} photographer
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
 * count total likes of medias photographer
 * @param {array} medias
 * @returns {number}
 */
const manageTotalLikes = (medias) => {
  let totalLikes = 0;
  for (let i = 0; i < medias.length; i++) {
    totalLikes += medias[i].likes;
  }
  return totalLikes;
};

/**
 * Function that retrieves the div containing the photographer's infos (total likes + daily rate)
 * @param {object} photographer
 * @param {number} totalLikes
 */
const displayPhotographerInfos = (photographer, totalLikes) => {
  try {
    const photographerMain = document.querySelector('.main');
    const photographerInfosDOM = createPhotographerInfos(
      photographer,
      totalLikes
    );
    photographerMain.appendChild(photographerInfosDOM);
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Function that retrieves the div containing the photographer's page header
 * and displays the profile data, manage likes medias and manage lightbox media
 * @param {object} photographer
 * @param {array} medias
 * @param {string} pictureNameRepository
 * @param {number} totalLikes
 */
export const displayPhotographerGallery = async (
  photographer,
  medias,
  pictureNameRepository,
  totalLikes
) => {
  try {
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );
    medias.forEach((media) => {
      media = mediaFactory(media);
      const mediaArticleDOM = createPhotographerMediaCard(
        pictureNameRepository,
        media
      );
      photographerGallery.appendChild(mediaArticleDOM);
      // manage media like/unlike
      const buttonLike = document.getElementById(
        `media-card-button-likes-${media.id}`
      );
      const likesNumber = document.getElementById(
        `media-card-likes-${media.id}`
      );
      let isLiked = false;
      buttonLike.addEventListener('click', () => {
        if (isLiked) {
          media.likes -= 1;
          totalLikes -= 1;
          // tells screen reader if the user has already liked the media
          buttonLike.setAttribute('aria-pressed', false);
        } else {
          media.likes += 1;
          console.log(media);
          totalLikes += 1;
          // tells screen reader if the user has already liked the media
          buttonLike.setAttribute('aria-pressed', true);
        }
        isLiked = !isLiked;
        // To perpetuate the data, the object must be updated in the database (update(media)).
        likesNumber.textContent = media.likes;
        // update total Likes html
        displayPhotographerInfos(photographer, totalLikes);
      });
      // manage media lightbox
      manageMediaLightBoxModal(media, pictureNameRepository, medias);
    });
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * Function that manage display lightbox modal
 * @param {object} media
 * @param {string} pictureNameRepository
 * @param {array} medias
 */
const manageMediaLightBoxModal = (media, pictureNameRepository, medias) => {
  const openLightBoxModalBtn = document.getElementById(
    `media-card-${media.id}`
  );
  openLightBoxModalBtn.addEventListener('click', () => {
    const modalLightBox = initModal(
      'modal__lightbox',
      openLightBoxModalBtn,
      null,
      media,
      pictureNameRepository,
      medias
    );
    modalLightBox.displayModal();
  });
};

/**
 * Function that manage display contact form modal
 * @param {object} photographer
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
    let modalForm = initModal(
      'modal__contact',
      openContactModalBtn,
      photographer
    );
    openContactModalBtn.addEventListener('click', () => {
      modalForm.displayModal();
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Function called up on loading, retrieves photographer data according to id and display elements
 */
const init = async () => {
  try {
    const datasPhotographer = ApiPhotographers();
    const datasMedia = ApiMedia();
    let params = new URL(document.location).searchParams;
    const idPhotographer = params.get('id');
    let photographer = await datasPhotographer.getPhotographerById(
      idPhotographer
    );
    // if id is empty or doesn't exist in database --> home redirection
    if (!photographer) {
      window.location.href = '../index.html';
    } else {
      photographer = Photographer(photographer);
      console.log(photographer);
      const medias = await datasMedia.getMediasByPhotographerId(idPhotographer);
      console.log(medias);
      // path to picture (only firstname is needed)
      const pictureNameRepository = photographer.name.split(' ')[0];
      displayPhotographerProfile(photographer);
      let totalLikes = manageTotalLikes(medias);
      displayPhotographerInfos(photographer, totalLikes);
      displayPhotographerGallery(
        photographer,
        medias,
        pictureNameRepository,
        totalLikes
      );
      manageGallerySorted(
        photographer,
        medias,
        pictureNameRepository,
        totalLikes
      );
      manageContactFormModal(photographer);
    }
  } catch (error) {
    console.log(error.message);
  }
};
