/* eslint-disable no-unused-vars */
/*********************************************************************************
*
* This file contains all the functions required to manage modal
*
/*********************************************************************************/
import { initContactForm } from '../utils/contactForm.js';
import { initLightBox } from '../utils/lightBox.js';
/**
 * modal initialization
 * To reuse the modal, initialize the content
 * according to the parameter passed (modalElementId).
 * @param {string} modalElementId
 * @param {object} photographer //TODO rendre optionnel
 * @param {object} media (optional)
 * @param {string} pictureNameRepository (optional)
 * @returns
 */
const initModal = (
  modalElementId,
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
    // contact form
    //TODO switchcase
    if (modalElementId === 'modal__contact') {
      initContactForm(closeModal, photographer);
      //media lightbox
    } else if (modalElementId === 'modal__lightbox') {
      initLightBox(pictureNameRepository, media, medias);
    }
  };

  const closeModal = () => {
    modal.style.display = 'none';
    photographerMain.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };

  // accessibility with key
  document.addEventListener('keydown', (e) => {
    // Close modal when escape key is pressed
    if (
      modal.getAttribute('aria-hidden') == 'false' &&
      (e.key === 'Escape' || e.code === 'Escape')
    ) {
      closeModal();
    }
    // Trap focus into modal
    if (
      modal.getAttribute('aria-hidden') == 'false' &&
      (e.key === 'Tab' || e.code === 'Tab')
    ) {
      if (e.shiftKey) {
        /* shift + tab */
        if (document.activeElement === firstFocusElement) {
          lastFocusElement.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusElement) {
          firstFocusElement.focus();
          e.preventDefault();
        }
      }
    }
  });
  return { displayModal, closeModal };
};
export { initModal };
