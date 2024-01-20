import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';

//Mettre le code JavaScript lié à la page photographer.html

// Création d'un objet URL à partir de l'URL actuelle du document
const url = new URL(document.location);

// Accès aux searchParams de cet objet URL
const params = url.searchParams;

// Récupération de la valeur du paramètre 'id'
const id = params.get('id');

console.log('id photographe', id);

// async function getPhotographer() {
//   try {
//     const datas = await getPhotographers();
//     const photographer = datas.photographers.filter(
//       (photographer) => photographer.id === parseInt(id)
//     );
//     return photographer;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des photographes:', error);
//   }
// }

// async function initPhotographerPage() {
//   const photographerDatas = await getPhotographer();

//   console.log('données photographe', photographerDatas);

//   const photographerModelSinglePage = photographerTemplate(photographerDatas);
//   const photographerCardDom = photographerModelSinglePage.getUserCardDOM();
//   const photographerHeader = document.querySelector('.photograph-header');
//   photographerHeader.appendChild(photographerCardDom);
// }

// initPhotographerPage();

async function getPhotographer() {
  try {
    const datas = await getPhotographers();
    // Ici, on extrait le premier élément du tableau filtré
    // ou find
    const photographer = datas.photographers.filter(
      (photographer) => photographer.id === parseInt(id)
    )[0];
    console.log(datas);
    const photographerMedias = datas.media.filter(
      (oneMedia) => oneMedia.photographerId == id
    );
    console.log(photographerMedias);
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
  console.log('données photographe', photographer);

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
}

initPhotographerPage();
