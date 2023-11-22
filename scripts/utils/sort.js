/*********************************************************************************
*
* This file contains all the functions required to manage medias sorting
*
/*********************************************************************************/
import { displayPhotographerGallery } from '../pages/Photographer.js';
import { manageAccessibilityFocus } from './accessibility.js';
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
  const openSorterList = document.querySelector(
    '.photographer__sorter-button-opener'
  );
  const sorterList = document.querySelector('.photographer__sorter-list');
  const sorterArrowClosed = document.getElementById(
    'photographer__sorter-arrow-close'
  );
  const selectedSort = document.getElementById('selected-sort');
  const popularSorter = document.getElementById(
    'photographer__sorter-popularity'
  );
  const dateSorter = document.getElementById('photographer__sorter-date');
  const titleSorter = document.getElementById('photographer__sorter-title');
  let mediasSorted;

  openSorterList.addEventListener('click', () => {
    toggleSorter();
  });
  sorterArrowClosed.addEventListener('click', () => {
    toggleSorter();
  });

  /**
   * manage sort depend of clicked button
   * @param {HTMLElement} button
   */
  const manageEventButtonSort = (button) => {
    button.addEventListener('click', () => {
      displayMediasSortered(button.textContent, button);
    });
  };

  manageEventButtonSort(popularSorter);
  manageEventButtonSort(dateSorter);
  manageEventButtonSort(titleSorter);

  /**
   * manage open/close sorter list
   */
  const toggleSorter = () => {
    const ariaExpandedAttribute = openSorterList.getAttribute('aria-expanded');
    if (ariaExpandedAttribute === 'false') {
      sorterList.classList.add('photographer__sorter-list--open');
      openSorterList.setAttribute('aria-expanded', true);
      sorterArrowClosed.focus();
    } else {
      sorterList.classList.remove('photographer__sorter-list--open');
      openSorterList.setAttribute('aria-expanded', false);
      openSorterList.focus();
    }
  };

  /**
   * Sort medias depend of selected sort
   * @param {string} sorter
   * @returns {array}
   */
  const sorterMedias = (sorter) => {
    switch (sorter) {
      case 'Popularité':
        mediasSorted = [...medias].sort((a, b) => b.likes - a.likes);
        break;
      case 'Date':
        mediasSorted = [...medias].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case 'Titre':
        mediasSorted = [...medias].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }
    return mediasSorted;
  };

  /**
   * Reload galery for display media sorted
   * @param {string} sorter
   * @param {HTMLElement} sorterButton
   */
  const displayMediasSortered = (sorter, sorterButton) => {
    popularSorter.removeAttribute('aria-current');
    dateSorter.removeAttribute('aria-current');
    titleSorter.removeAttribute('aria-current');
    const photographerGallery = document.querySelector(
      '.photographer__gallery'
    );
    // empty gallery
    photographerGallery.innerHTML = '';
    mediasSorted = sorterMedias(sorter);
    // change button content by the current sorter
    selectedSort.textContent = sorter;
    sorterButton.setAttribute('aria-current', 'location');
    toggleSorter();
    displayPhotographerGallery(
      photographer,
      mediasSorted,
      pictureNameRepository,
      totalLikes
    );
  };

  // accessibility trap focus
  manageAccessibilityFocus(
    openSorterList,
    'aria-expanded',
    'true',
    toggleSorter,
    sorterArrowClosed,
    titleSorter
  );
};

export { manageGallerySorted };
