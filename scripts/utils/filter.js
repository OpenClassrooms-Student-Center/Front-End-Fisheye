/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage medias filter
*
/*********************************************************************************/
import { displayPhotographerGallery } from '../pages/Photographer.js';
/**
 *
 * @param {object} photographer
 * @param {array} medias
 * @param {string} pictureNameRepository
 * @param {number} totalLikes
 */
const manageGalleryFiltered = (
  photographer,
  medias,
  pictureNameRepository,
  totalLikes
) => {
  const openFilterList = document.querySelector('.photographer__filter-button');
  const filterList = document.querySelector('.photographer__filter-list');
  const popularFilter = document.getElementById(
    'photographer__filter-popularity'
  );
  const dateFilter = document.getElementById('photographer__filter-date');
  const titleFilter = document.getElementById('photographer__filter-title');
  let mediasFiltered;

  openFilterList.addEventListener('click', () => {
    toggleFilter();
  });

  popularFilter.addEventListener('click', () => {
    displayMediasFiltered('popularity', popularFilter);
  });
  dateFilter.addEventListener('click', () => {
    displayMediasFiltered('date', dateFilter);
  });
  titleFilter.addEventListener('click', () => {
    displayMediasFiltered('title', titleFilter);
  });

  //TODO navigation clavier
  const toggleFilter = () => {
    const ariaExpandedAttribute = openFilterList.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      filterList.style.display = 'flex';
      openFilterList.setAttribute('aria-expanded', true);
      popularFilter.focus();
    } else {
      filterList.style.display = 'none';
      openFilterList.setAttribute('aria-expanded', false);
    }
  };

  const filterMedias = (filter) => {
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );
    // empty gallery
    photographerGallery.innerHTML = '';
    switch (filter) {
      case 'popularity':
        mediasFiltered = [...medias].sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        mediasFiltered = [...medias].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case 'title':
        mediasFiltered = [...medias].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }
    return mediasFiltered;
  };
  const displayMediasFiltered = (filter, filterButton) => {
    popularFilter.removeAttribute('aria-current');
    dateFilter.removeAttribute('aria-current');
    titleFilter.removeAttribute('aria-current');
    mediasFiltered = filterMedias(filter);
    filterButton.setAttribute('aria-current', 'location');
    toggleFilter();
    displayPhotographerGallery(
      photographer,
      mediasFiltered,
      pictureNameRepository,
      totalLikes
    );
  };
};

export { manageGalleryFiltered };
