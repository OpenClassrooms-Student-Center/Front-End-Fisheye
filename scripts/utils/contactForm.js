/* eslint-disable no-unused-vars */
const body = document.querySelector('body');
const photographerMain = document.querySelector('.photographer__main');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modal = document.getElementById('contact__modal');

//TODO focus on modal
const displayModal = () => {
  photographerMain.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  modal.focus();
  modal.style.display = 'block';
};

const closeModal = () => {
  photographerMain.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('no-scroll');
  modal.style.display = 'none';
};
// Close modal when escape key is pressed
document.addEventListener('keydown', (e) => {
  const keyCode = e.code;
  if (modal.getAttribute('aria-hidden') == 'false' && keyCode === 'Escape') {
    closeModal();
  }
});
