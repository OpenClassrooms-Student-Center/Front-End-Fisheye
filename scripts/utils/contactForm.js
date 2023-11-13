/* eslint-disable no-unused-vars */
const body = document.querySelector('body');
const photographerMain = document.querySelector('.photographer__main');
const closeModalBtn = document.querySelector('.close-modal-button');
const openModalBtn = document.querySelector('.photographer__contact-button');
const modal = document.getElementById('contact__modal');
const firstInput = document.getElementById('firstName');

const displayModal = () => {
  modal.style.display = 'block';
  closeModalBtn.focus();
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('no-scroll');
  photographerMain.setAttribute('aria-hidden', 'true');
};

const closeModal = () => {
  //TODO pourquoi ca marche pas + ne pas envoyer si enter
  console.log(openModalBtn);
  modal.style.display = 'none';
  photographerMain.setAttribute('aria-hidden', 'false');
  modal.setAttribute('aria-hidden', 'true');
  // openModalBtn.focus();
  body.classList.remove('no-scroll');
};
// Close modal when escape key is pressed
document.addEventListener('keydown', (e) => {
  const keyCode = e.code;
  if (modal.getAttribute('aria-hidden') == 'false' && keyCode === 'Escape') {
    closeModal();
  }
});
