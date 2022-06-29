import getSelectedSort from '../functions/getSelectedSort.js';
import mediaFactory from '../factories/media.js';
import Presentation from '../model/presentation.js';
import Modal from '../model/Modal.js';
import presentationTemplate from '../templates/presentationTemplate.js';
import totalLikes from '../model/totalLikes.js';
import modalTemplate from '../templates/modal.js';

function getphotographerId() {
  return new URL(window.location.href).searchParams.get('id');
}

async function getPresentation(photographerId) {
  fetch('../data/photographers.json')
    .then((res) => res.json())
    .then((data) => data.photographers.filter(
      (photographe) => photographe.id === parseInt(photographerId, 10),
    ))
    .then((filtingphotographe) => {
      const newPresentation = new Presentation(filtingphotographe[0]);
      const section = document.createElement('section');
      section.innerHTML = presentationTemplate(newPresentation);
      document.querySelector('.presentation__section').appendChild(section);
      section.className = 'photograph-header';
    });
}

async function getPhotos(photographerId) {
  fetch('../data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const dataMedias = data.media.filter(
        (photo) => photo.photographerId === parseInt(photographerId, 10),
      );
      const dataPhotographer = data.photographers.filter(
        (photographer) => photographer.id === parseInt(photographerId, 10),
      );
      const dataPage = dataPhotographer[0];
      const medias = dataMedias.map((dataMedia) => mediaFactory(dataMedia, dataPage.name));
      const sortMedia = getSelectedSort(medias);

      const sumLikes = document.querySelector('.totalLikes__likes');
      sumLikes.innerHTML = totalLikes(sortMedia);
      const pricePerDay = document.querySelector('.totalLikes__price');
      pricePerDay.innerHTML = `${dataPage.price}€ /jour`;

      const modalContainer = document.getElementById('contact_modal');
      const modal = document.createElement('section');
      modalContainer.appendChild(modal);
      modal.outerHTML = modalTemplate(dataPage.name);
      const modalData = new Modal();
      const contactButton = document.querySelector('.contact_button');
      contactButton.addEventListener('click', () => modalData.displayModal());
    });
}

async function initPhotographe() {
  const photographerId = getphotographerId();
  await getPresentation(photographerId);
  await getPhotos(photographerId);
}

initPhotographe();
