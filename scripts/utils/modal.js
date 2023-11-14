/* eslint-disable no-unused-vars */
import { initContactForm } from './contactForm.js';

const initModal = (photographerName) => {
  const body = document.querySelector('body');
  const photographerMain = document.querySelector('.photographer__main');
  const closeModalBtn = document.querySelector('.close-modal-button');
  const modal = document.getElementById('contact__modal');
  const firstFocusElement = closeModalBtn;
  const lastFocusElement = document.querySelector('.submit-button');
  const nameTitle = document.getElementById('photographer-name');

  const displayModal = () => {
    modal.style.display = 'block';
    nameTitle.textContent = `${photographerName}`;
    closeModalBtn.focus();
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    photographerMain.setAttribute('aria-hidden', 'true');
    initContactForm(closeModal);
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
