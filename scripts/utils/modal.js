/*********************************************************************************
*
* This file contains all the functions required to manage modal
* The modal is reusable, only the content can be modified
*
/*********************************************************************************/
import { initContactForm } from '../utils/contactForm.js';
import { initLightbox } from './lightbox.js';
import { manageAccessibilityFocus } from './accessibility.js';

/**
 * modal initialization
 * To reuse the modal, initialize the content
 * according to the parameter passed (modalElementId).
 * elementDOM permitted to refocused on clicked element when closed modal
 * @param {string} modalElementId
 * @param {object} photographer (optional)
 * @param {object} media (optional)
 * @param {string} pictureNameRepository (optional)
 * @param {array<object>} medias (optional)
 * @returns
 */
const initModal = (
  modalElementId,
  elementDOM,
  photographer,
  media,
  pictureNameRepository,
  medias
) => {
  const body = document.querySelector('body');
  const photographerMain = document.querySelector('.main');
  const closeModalBtn = document.querySelector(
    `.${modalElementId}-close-button`
  );
  closeModalBtn.addEventListener('click', () => {
    closeModal();
  });
  const modal = document.getElementById(modalElementId);
  const firstFocusElement = closeModalBtn;
  const lastFocusElement = document.querySelector(
    `.${modalElementId}-last-focus`
  );

  const displayModal = () => {
    modal.style.display = 'block';
    closeModalBtn.focus();
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    photographerMain.setAttribute('aria-hidden', 'true');
    // initialize element depend of modalElementId
    switch (modalElementId) {
      // contact form
      case 'modal__contact':
        initContactForm(closeModal, photographer);
        break;
      // media lightbox
      case 'modal__lightbox':
        initLightbox(modal, pictureNameRepository, media, medias);
        break;
      default:
        console.log(`${modalElementId} doesn't match with cases`);
    }
  };

  const closeModal = () => {
    modal.style.display = 'none';
    photographerMain.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    elementDOM.focus();
  };

  // accessibility trap focus
  manageAccessibilityFocus(
    modal,
    'aria-hidden',
    'false',
    closeModal,
    firstFocusElement,
    lastFocusElement
  );

  return { displayModal, closeModal };
};
export { initModal };
