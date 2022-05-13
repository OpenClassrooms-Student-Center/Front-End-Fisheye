import getSelectedSort from '../functions/getSelectedSort.js';
import hydratePhotoFactory from '../factories/photo.js';
import sliderFactory from '../factories/slider.js';
import createPhotoCard from '../templates/Card.js';
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
      const mediaPage = data.photographers.filter(
        (photographer) => photographer.id === parseInt(photographerId, 10),
      );
      const medias = dataMedias.map((media) => hydratePhotoFactory(media, mediaPage[0].name));
      return [medias, mediaPage[0].name, mediaPage[0].price];
    })
    .then((data) => {
      const photosId = data[0];
      const name = data[1];
      const price = data[2];
      const sortMedia = getSelectedSort(photosId);

      const container = document.querySelector('.photo-field');
      sortMedia.forEach((media) => {
        const card = document.createElement('article');
        card.classList.add('cardMedia');
        card.innerHTML = createPhotoCard(media, name);
        const cardMedia = container.appendChild(card);

        const img = cardMedia.querySelector('.photo');
        img.addEventListener('click', () => sliderFactory(media, sortMedia, name));

        const like = cardMedia.querySelector('.photo__likes');
        like.addEventListener('click', (e) => media.toggleLike(e));
      });
      const sumLikes = document.querySelector('.totalLikes__likes');
      sumLikes.innerHTML = totalLikes(sortMedia);
      const pricePerDay = document.querySelector('.totalLikes__price');
      pricePerDay.innerHTML = `${price} /jour`;

      const modalData = new Modal(name);
      const modalContainer = document.getElementById('contact_modal');
      const modal = document.createElement('div');
      modalContainer.appendChild(modal);
      modal.outerHTML = modalTemplate(modalData);
      const contactButton = document.querySelector('.contact_button');
      contactButton.addEventListener('click', () => modalData.displayModal());
      const iconClose = document.querySelector('.modal header img');

      iconClose.addEventListener('click', () => modalData.closeModal);
    });
}

async function initPhotographe() {
  const photographerId = getphotographerId();
  await getPresentation(photographerId);
  await getPhotos(photographerId);
}

initPhotographe();
