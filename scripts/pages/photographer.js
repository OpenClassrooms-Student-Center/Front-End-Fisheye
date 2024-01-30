// import { getPhotographers } from './index.js';
// import { photographerTemplate } from '../templates/photographer.js';
// import { mediaTemplate } from '../templates/media.js';

// // Création d'un objet URL à partir de l'URL actuelle du document
// const url = new URL(document.location);

// // Accès aux searchParams de cet objet URL
// const params = url.searchParams;

// // Récupération de la valeur du paramètre 'id'
// const id = params.get('id');

// let displayedMedias;
// let photographer;
// let isSortedAsc = true;

// async function createMedias(photographer) {
//   let mediaContainer = document.querySelector('.medias-container');
//   if (!mediaContainer) {
//     mediaContainer = document.createElement('div');
//     mediaContainer.classList.add('medias-container');
//     document.querySelector('#main').appendChild(mediaContainer);
//   }
//   // Nettoyez le conteneur avant de le remplir à nouveau
//   mediaContainer.innerHTML = '';

//   // const photographer = await getPhotographer();
//   const photographerName = photographer.name;

//   for (let oneMedia of displayedMedias) {
//     const mediaModel = mediaTemplate(oneMedia, photographerName);
//     const mediaCard = mediaModel.createMedia();
//     mediaContainer.appendChild(mediaCard);
//   }
// }

// async function getPhotographer() {
//   try {
//     const datas = await getPhotographers();
//     // Ici, on extrait le premier élément du tableau filtré
//     // ou find
//     photographer = datas.photographers.filter(
//       (photographer) => photographer.id === parseInt(id)
//     )[0];
//     const photographerMedias = datas.media.filter(
//       (oneMedia) => oneMedia.photographerId == id
//     );
//     displayedMedias = photographerMedias;

//     // console.log('hophophop', photographerInfos);
//     return photographer;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des photographes:', error);
//   }
// }

// async function initPhotographerPage() {
//   const photographer = await getPhotographer();
//   // const photographerName = photographer.name;

//   if (photographer) {
//     const photographerModelSinglePage = photographerTemplate(
//       photographer,
//       true,
//       'h1'
//     );
//     const photographerCardDom = photographerModelSinglePage.getUserCardDOM();
//     const photographerHeader = document.querySelector('.photograph-header');
//     photographerHeader.appendChild(photographerCardDom);
//   } else {
//     console.log('Aucun photographe trouvé avec cet ID.');
//   }

//   if (displayedMedias) {
//     createMedias(photographer);
//   }

//   if (photographer?.price) {
//     const priceTag = document.createElement('p');
//     priceTag.textContent = `${photographer.price}€ / jour`;
//     priceTag.classList.add('price-tag');
//     const body = document.getElementsByTagName('body');
//     body[0].appendChild(priceTag);
//   }
// }

// // function toggleOptions() {
// //   const option1 = document.querySelector('.option1');
// //   const option2 = document.querySelector('.option2');
// //   const option3 = document.querySelector('.option3');

// //   option1.addEventListener('click', () => {
// //     if (
// //       option2.classList.contains('all-options-displayed') &&
// //       option3.classList.contains('all-options-displayed')
// //     ) {
// //       sortPopularityDown();
// //     } else {
// //       option2.classList.toggle('all-options-displayed');
// //       option3.classList.toggle('all-options-displayed');
// //       console.log('toggle');
// //     }
// //     // Échanger les positions de option1 et option2
// //     option1.parentNode.insertBefore(option2, option1.nextSibling);
// //   });

// //   option2.addEventListener('click', () => {
// //     // Échanger les positions de option1 et option2
// //     option2.parentNode.insertBefore(option1, option2.nextSibling);
// //   });
// // }
// function toggleSortPopularity() {
//   if (isSortedAsc) {
//     displayedMedias.sort((a, b) => b.likes - a.likes);
//     console.log('Tri par popularité décroissante', displayedMedias);
//   } else {
//     displayedMedias.sort((a, b) => a.likes - b.likes);
//     console.log('Tri par popularité croissante', displayedMedias);
//   }
//   isSortedAsc = !isSortedAsc;
//   createMedias(photographer);
// }

// function toggleOptions() {
//   const option1 = document.querySelector('.option1');
//   const option2 = document.querySelector('.option2');
//   const option3 = document.querySelector('.option3');

//   option1.addEventListener('click', () => {
//     if (
//       option2.classList.contains('all-options-displayed') &&
//       option3.classList.contains('all-options-displayed')
//     ) {
//       toggleSortPopularity();
//     } else {
//       option2.classList.toggle('all-options-displayed');
//       option3.classList.toggle('all-options-displayed');
//       console.log('toggle');
//     }
//     option1.parentNode.insertBefore(option2, option1.nextSibling);
//   });

//   option2.addEventListener('click', () => {
//     option2.parentNode.insertBefore(option1, option2.nextSibling);
//   });
// }

// toggleOptions();
// initPhotographerPage();

// function sortPopularityUp() {
//   displayedMedias = medias.sort((a, b) => {
//     return b.likes - a.likes;
//   });
//   console.log('popularitySort', medias);
// }

// function sortPopularityDown() {
//   displayedMedias.sort((a, b) => a.likes - b.likes);
//   console.log('popularitySort', displayedMedias);
//   createMedias(photographer);
// }

// // async function sortDateUp() {
// //   displayedMedias = displayedMedias.sort((a, b) => {
// //     return b.date - a.date;
// //   });
// // }

// // async function sortDateDown() {
// //   displayedMedias = displayedMedias.sort((a, b) => {
// //     return a.date - b.date;
// //   });
// // }

// // async function sortTitleUp() {
// //   displayedMedias = displayedMedias.sort((a, b) => {
// //     return b.title - a.title;
// //   });
// // }

// // async function sortTitleDown() {
// //   displayedMedias = displayedMedias.sort((a, b) => {
// //     return a.title - b.title;
// //   });
// // }

// // function trySort() {
// //   const button = document.querySelector('.option1');
// // }

import { getPhotographers } from './index.js';
import { photographerTemplate } from '../templates/photographer.js';
import { mediaTemplate } from '../templates/media.js';

const url = new URL(document.location);
const params = url.searchParams;
const id = params.get('id');

let displayedMedias;
let photographer;
let isSortedByPopularityAsc = true;
let isSortedByDateAsc = true;
let isSortedByTitleAsc = true;

async function createMedias(photographer) {
  let mediaContainer = document.querySelector('.medias-container');
  if (!mediaContainer) {
    mediaContainer = document.createElement('div');
    mediaContainer.classList.add('medias-container');
    document.querySelector('#main').appendChild(mediaContainer);
  }
  mediaContainer.innerHTML = '';

  const photographerName = photographer.name;
  for (let oneMedia of displayedMedias) {
    const mediaModel = mediaTemplate(oneMedia, photographerName);
    const mediaCard = mediaModel.createMedia();
    mediaContainer.appendChild(mediaCard);
  }
}

async function getPhotographer() {
  try {
    const datas = await getPhotographers();
    photographer = datas.photographers.filter(
      (photographer) => photographer.id === parseInt(id)
    )[0];
    const photographerMedias = datas.media.filter(
      (oneMedia) => oneMedia.photographerId == id
    );
    displayedMedias = photographerMedias;
    return photographer;
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes:', error);
  }
}

async function initPhotographerPage() {
  photographer = await getPhotographer();
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
    createMedias(photographer);
  }

  if (photographer?.price) {
    const priceTag = document.createElement('p');
    priceTag.textContent = `${photographer.price}€ / jour`;
    priceTag.classList.add('price-tag');
    const body = document.getElementsByTagName('body');
    body[0].appendChild(priceTag);
  }
}

function toggleSortPopularity() {
  displayedMedias.sort((a, b) =>
    isSortedByPopularityAsc ? a.likes - b.likes : b.likes - a.likes
  );
  console.log('Tri par popularité', displayedMedias);
  isSortedByPopularityAsc = !isSortedByPopularityAsc;
  createMedias(photographer);
}

function toggleSortDate() {
  displayedMedias.sort((a, b) =>
    isSortedByDateAsc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );
  console.log('Tri par date', displayedMedias);
  isSortedByDateAsc = !isSortedByDateAsc;
  createMedias(photographer);
}

function toggleSortTitle() {
  displayedMedias.sort((a, b) =>
    isSortedByTitleAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );
  console.log('Tri par titre', displayedMedias);
  isSortedByTitleAsc = !isSortedByTitleAsc;
  createMedias(photographer);
}

function toggleOptions() {
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');

  option1.addEventListener('click', () => {
    toggleSelectedOption(option1, option2, option3);
  });

  option2.addEventListener('click', () => {
    toggleSelectedOption(option2, option1, option3);
  });

  option3.addEventListener('click', () => {
    toggleSelectedOption(option3, option1, option2);
  });
}

function toggleSelectedOption(selectedOption, otherOption1, otherOption2) {
  // Exécute la fonction de tri correspondante en fonction du texte de l'option
  if (selectedOption.textContent.includes('Popularité')) {
    toggleSortPopularity();
  } else if (selectedOption.textContent.includes('Date')) {
    toggleSortDate();
  } else if (selectedOption.textContent.includes('Titre')) {
    toggleSortTitle();
  }

  // Affiche toutes les options
  selectedOption.classList.remove('not-displayed-options');
  otherOption1.classList.remove('not-displayed-options');
  otherOption2.classList.remove('not-displayed-options');

  // Réorganise les options pour que l'option sélectionnée soit en haut
  const dropdown = document.querySelector('.dropdown-buttons');
  dropdown.insertBefore(selectedOption, dropdown.firstChild);
}

toggleOptions();
initPhotographerPage();
