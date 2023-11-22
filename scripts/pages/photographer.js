/*********************************************************************************
*
* This file control photographer page
*
/*********************************************************************************/

import { ApiPhotographers } from '../models/api/ApiPhotographers.js';
import { ApiMedia } from '../models/api/ApiMedia.js';
import { Photographer } from '../models/metier/Photographer.js';
import { mediaFactory } from '../models/factories/MediaFactory.js';

import { displayPhotographerProfile } from '../templates/photographerProfileTemplate.js';
import { displayPhotographerMediaCard } from '../templates/photographerMediaCardTemplate.js';
import { displayPhotographerInfos } from '../templates/photographerInfosTemplate.js';

import { initModal } from '../utils/modal.js';
import { manageGallerySorted } from '../utils/sort.js';

/**
 * Executed when photographer page is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  init();
});

/**
 * Function that retrieves the section containing the photographer's gallery
 * and displays medias, manage likes medias and manage lightbox media
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
  const photographerGallery = document.querySelector('.photographer__gallery');
  medias.forEach((media) => {
    media = mediaFactory(media);
    let isLiked = false;
    const mediaArticleDOM = displayPhotographerMediaCard(
      pictureNameRepository,
      media
    );
    photographerGallery.appendChild(mediaArticleDOM);
    // manage media like/unlike
    const buttonLike = document.getElementById(
      `media-card-button-likes-${media.id}`
    );
    const likesNumber = document.getElementById(`media-card-likes-${media.id}`);
    buttonLike.addEventListener('click', () => {
      if (isLiked) {
        media.removeLike();
        totalLikes -= 1;
        // tells screen reader if the user has already liked the media
        buttonLike.setAttribute('aria-pressed', false);
      } else {
        media.addLike();
        totalLikes += 1;
        // tells screen reader if the user has already liked the media
        buttonLike.setAttribute('aria-pressed', true);
      }
      isLiked = !isLiked;
      likesNumber.textContent = media.getLikes();
      // update total Likes html
      displayPhotographerInfos(photographer, totalLikes);
    });
    // manage media lightbox
    manageMediaLightboxModal(media, pictureNameRepository, medias);
  });
};
/**
 * Function that manage display lightbox modal when user click on picture
 * @param {object} media
 * @param {string} pictureNameRepository
 * @param {array} medias
 */
const manageMediaLightboxModal = (media, pictureNameRepository, medias) => {
  const openLightboxModalBtn = document.getElementById(
    `media-card-${media.id}`
  );
  openLightboxModalBtn.addEventListener('click', () => {
    const modalLightbox = initModal(
      'modal__lightbox',
      openLightboxModalBtn,
      null,
      media,
      pictureNameRepository,
      medias
    );
    modalLightbox.displayModal();
  });
};

/**
 * Function that manage display contact form modal when user click on "contactez-moi"
 * @param {object} photographer
 */
const manageContactFormModal = (photographer) => {
  // "contactez-moi" profile button
  const openContactModalBtn = document.querySelector(
    '.modal__contact-open-button'
  );
  // display name on modal title
  const nameTitle = document.getElementById('modal__contact-photographer-name');
  nameTitle.textContent = `${photographer.name}`;
  let modalForm = initModal(
    'modal__contact',
    openContactModalBtn,
    photographer
  );
  openContactModalBtn.addEventListener('click', () => {
    modalForm.displayModal();
  });
};

/**
 * count total likes of medias photographer
 * @param {array} medias
 * @returns {number}
 */
const manageInitialTotalLikes = (medias) => {
  let totalLikes = 0;
  for (let i = 0; i < medias.length; i++) {
    totalLikes += medias[i].likes;
  }
  return totalLikes;
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
      displayPhotographerProfile(photographer);
      // path to picture (only firstname is needed)
      const pictureNameRepository = photographer.name.split(' ')[0];
      const totalLikes = manageInitialTotalLikes(medias);
      displayPhotographerInfos(photographer, totalLikes);
      manageGallerySorted(
        photographer,
        medias,
        pictureNameRepository,
        totalLikes
      );
      displayPhotographerGallery(
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
