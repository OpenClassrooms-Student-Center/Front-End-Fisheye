import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';

//Mettre le code JavaScript lié à la page photographer.html

// Création d'un objet URL à partir de l'URL actuelle du document
const url = new URL(document.location);

// Accès aux searchParams de cet objet URL
const params = url.searchParams;

// Récupération de la valeur du paramètre 'id'
const id = params.get('id');

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
    // console.log('all medias', photographerMedias);
    const photographerInfos = {
      photographer,
      medias: photographerMedias,
    };
    return photographerInfos;
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes:', error);
  }
}

async function initPhotographerPage() {
  const { photographer, medias } = await getPhotographer();
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

  if (medias) {
    const allMediasContainer = document.createElement('div');
    allMediasContainer.classList.add('medias-container');
    for (let oneMedia of medias) {
      const mediaModel = mediaTemplate(oneMedia, photographerName);
      // const mediaCard = mediaModel.createMedia(oneMedia.video); // Utilisez le type de média pour déterminer si c'est une vidéo
      const mediaCard = mediaModel.createMedia(); // Utilisez le type de média pour déterminer si c'est une vidéo
      const main = document.querySelector('#main');
      allMediasContainer.appendChild(mediaCard);
      main.appendChild(allMediasContainer);

      console.log(oneMedia.video ? 'video' : 'image', oneMedia);
    }
  }
}

initPhotographerPage();
