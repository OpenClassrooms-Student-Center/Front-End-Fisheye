import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';

// toggleOptions();

//Mettre le code JavaScript lié à la page photographer.html

// Création d'un objet URL à partir de l'URL actuelle du document
const url = new URL(document.location);

// Accès aux searchParams de cet objet URL
const params = url.searchParams;

// Récupération de la valeur du paramètre 'id'
const id = params.get('id');

let displayedMedias;

async function getPhotographer() {
  try {
    const datas = await getPhotographers();
    // Ici, on extrait le premier élément du tableau filtré
    // ou find
    const photographer = datas.photographers.filter(
      (photographer) => photographer.id === parseInt(id)
    )[0];
    const photographerMedias = datas.media.filter(
      (oneMedia) => oneMedia.photographerId == id
    );
    displayedMedias = photographerMedias;

    // console.log('hophophop', photographerInfos);
    return photographer;
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes:', error);
  }
}

async function initPhotographerPage() {
  const photographer = await getPhotographer();
  console.log('test', photographer.name);
  const photographerName = photographer.name;

  if (photographer) {
    const photographerModelSinglePage = photographerTemplate(
      photographer,
      true,
      'h1'
    );
    const photographerCardDom = photographerModelSinglePage.getUserCardDOM();
    const photographerHeader = document.querySelector('.photograph-header');
    photographerHeader.appendChild(photographerCardDom);
  } else {
    console.log('Aucun photographe trouvé avec cet ID.');
  }

  if (displayedMedias) {
    const allMediasContainer = document.createElement('div');
    allMediasContainer.classList.add('medias-container');
    for (let oneMedia of displayedMedias) {
      const mediaModel = mediaTemplate(oneMedia, photographerName);
      // const mediaCard = mediaModel.createMedia(oneMedia.video); // Utilisez le type de média pour déterminer si c'est une vidéo
      const mediaCard = mediaModel.createMedia(); // Utilisez le type de média pour déterminer si c'est une vidéo
      const main = document.querySelector('#main');
      allMediasContainer.appendChild(mediaCard);
      main.appendChild(allMediasContainer);

      // console.log(oneMedia.video ? 'video' : 'image', oneMedia);
    }
  }

  if (photographer.price) {
    const priceTag = document.createElement('p');
    priceTag.textContent = `${photographer.price}€ / jour`;
    priceTag.classList.add('price-tag');
    const body = document.getElementsByTagName('body');
    body[0].appendChild(priceTag);
  }
}

function toggleOptions() {
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');

  option1.addEventListener('click', () => {
    option2.classList.toggle('all-options-displayed');
    option3.classList.toggle('all-options-displayed');
    console.log('toggle');
  });
}
toggleOptions();
initPhotographerPage();

function sortPopularityUp() {
  medias = medias.sort((a, b) => {
    return b.likes - a.likes;
  });
  console.log('popularitySort', medias);
}

function sortPopularityDown() {
  medias = medias.sort((a, b) => {
    return a.likes - b.likes;
  });
  console.log('popularitySort', medias);
}

async function sortDateUp() {
  let { medias } = await getPhotographer();
  medias = medias.sort((a, b) => {
    return b.date - a.date;
  });
  console.log('popularitySort', medias);
}

async function sortDateDown() {
  let { medias } = await getPhotographer();
  medias = medias.sort((a, b) => {
    return a.date - b.date;
  });
  console.log('popularitySort', medias);
}

async function sortTitleUp() {
  let { medias } = await getPhotographer();
  medias = medias.sort((a, b) => {
    return b.title - a.title;
  });
  console.log('popularitySort', medias);
}

async function sortTitleDown() {
  let { medias } = await getPhotographer();
  medias = medias.sort((a, b) => {
    return a.title - b.title;
  });
  console.log('popularitySort', medias);
}
