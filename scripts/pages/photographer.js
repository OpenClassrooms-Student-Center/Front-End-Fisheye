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
const displayPhotographerGallery = async (
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
      manageMediaLightBox(photographer, media, pictureNameRepository, medias);
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Function that manage lightbox modal
 * @param {object} photographer
 * @param {object} media
 * @param {string} pictureNameRepository
 * @param {array} medias
 */
const manageMediaLightBox = (
  photographer,
  media,
  pictureNameRepository,
  medias
) => {
  const openLightBoxModalBtn = document.getElementById(
    `media-card-${media.id}`
  );
  let modalLightBox = initModal(
    'modal__lightbox',
    null,
    media,
    pictureNameRepository,
    medias
  );
  openLightBoxModalBtn.addEventListener('click', () => {
    modalLightBox.displayModal();
  });
};

const manageGalleryFiltered = (medias) => {
  const openFilterList = document.querySelector('.photographer__filter-button');
  const filterList = document.querySelector('.photographer__filter-list');
  const filterItem = document.querySelectorAll('.photographer__filter-item');
  const popularFilter = document.getElementById(
    'photographer__filter-popularity'
  );
  const dateFilter = document.getElementById('photographer__filter-date');
  const titleFilter = document.getElementById('photographer__filter-title');
  let mediasFiltered;
  openFilterList.addEventListener('click', () => {
    toggleFilter();
  });
  filterItem.forEach((item) => {
    item.addEventListener('click', () => {
      toggleFilter();
    });
  });
  popularFilter.addEventListener('click', () => {
    // trier
    mediasFiltered = filterMedias('popularity');
    popularFilter.setAttribute('aria-current', 'location');
    dateFilter.removeAttribute('aria-current');
    titleFilter.removeAttribute('aria-current');
  });
  dateFilter.addEventListener('click', () => {
    // trier
    mediasFiltered = filterMedias('date');
    dateFilter.setAttribute('aria-current', 'location');
    popularFilter.removeAttribute('aria-current');
    titleFilter.removeAttribute('aria-current');
  });
  titleFilter.addEventListener('click', () => {
    // trier
    mediasFiltered = filterMedias('title');
    titleFilter.setAttribute('aria-current', 'location');
    popularFilter.removeAttribute('aria-current');
    dateFilter.removeAttribute('aria-current');
  });

  //TODO navigation clavier
  const toggleFilter = () => {
    const ariaExpandedAttribute = openFilterList.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      filterList.style.display = 'flex';
      openFilterList.setAttribute('aria-expanded', true);
    } else {
      filterList.style.display = 'none';
      openFilterList.setAttribute('aria-expanded', false);
    }
  };

  const filterMedias = (filter) => {
    // [...medias].sort()
    switch (filter) {
      case 'popularity':
        console.log('popularity');
        // mediasFiltered =
        break;
      case 'date':
        console.log('date');
        // mediasFiltered =
        break;
      case 'title':
        console.log('title');
        // mediasFiltered =
        break;
    }
    // return mediasFiltered
  };
};
// aria-current="location"

/**
 * Function that manage contact form modal
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
    let modalForm = initModal('modal__contact', photographer);
    openContactModalBtn.addEventListener('click', () => {
      modalForm.displayModal();
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
      manageGalleryFiltered(medias);
      manageContactFormModal(photographer);
    }
  } catch (error) {
    console.log(error.message);
  }
};
