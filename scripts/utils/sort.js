/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage medias sorting
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
const manageGallerySorted = (
  photographer,
  medias,
  pictureNameRepository,
  totalLikes
) => {
  const openSorterList = document.querySelector('.photographer__sorter-button');
  const sorterList = document.querySelector('.photographer__sorter-list');
  const popularSorter = document.getElementById(
    'photographer__sorter-popularity'
  );
  const dateSorter = document.getElementById('photographer__sorter-date');
  const titleSorter = document.getElementById('photographer__sorter-title');
  let mediasSorted;

  openSorterList.addEventListener('click', () => {
    toggleSorter();
  });

  popularSorter.addEventListener('click', () => {
    displayMediassortered('popularity', popularSorter);
  });
  dateSorter.addEventListener('click', () => {
    displayMediassortered('date', dateSorter);
  });
  titleSorter.addEventListener('click', () => {
    displayMediassortered('title', titleSorter);
  });

  //TODO navigation clavier
  const toggleSorter = () => {
    const ariaExpandedAttribute = openSorterList.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      sorterList.style.display = 'flex';
      openSorterList.setAttribute('aria-expanded', true);
      popularSorter.focus();
    } else {
      sorterList.style.display = 'none';
      openSorterList.setAttribute('aria-expanded', false);
    }
  };

  const sorterMedias = (sorter) => {
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );
    // empty gallery
    photographerGallery.innerHTML = '';
    switch (sorter) {
      case 'popularity':
        mediasSorted = [...medias].sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        mediasSorted = [...medias].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case 'title':
        mediasSorted = [...medias].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }
    return mediasSorted;
  };
  const displayMediassortered = (sorter, sorterButton) => {
    popularSorter.removeAttribute('aria-current');
    dateSorter.removeAttribute('aria-current');
    titleSorter.removeAttribute('aria-current');
    mediasSorted = sorterMedias(sorter);
    sorterButton.setAttribute('aria-current', 'location');
    toggleSorter();
    displayPhotographerGallery(
      photographer,
      mediasSorted,
      pictureNameRepository,
      totalLikes
    );
  };
};

export { manageGallerySorted };
