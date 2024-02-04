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
let isDropdownOpen = false;

async function createMedias(photographer) {
  let mediasContainer = document.querySelector('.medias-container');
  if (!mediasContainer) {
    mediasContainer = document.createElement('div');
    mediasContainer.classList.add('medias-container');
    document.querySelector('#main').appendChild(mediasContainer);
  }

  mediasContainer.innerHTML = '';

  const photographerName = photographer.name;

  for (let oneMedia of displayedMedias) {
    const mediaModel = mediaTemplate(oneMedia, photographerName);
    const mediaCard = mediaModel.createMedia();
    mediasContainer.appendChild(mediaCard);
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

function displayArrows() {
  if (isSortedByPopularityAsc) {
    const buttonPopularity = document.querySelector('.option1');
    const arrowDown = buttonPopularity.querySelector('.fa-chevron-down');
    const arrowUp = buttonPopularity.querySelector('.fa-chevron-up');
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'inline';
  } else {
    const buttonPopularity = document.querySelector('.option1');
    const arrowDown = buttonPopularity.querySelector('.fa-chevron-down');
    const arrowUp = buttonPopularity.querySelector('.fa-chevron-up');
    arrowUp.style.display = 'none';
    arrowDown.style.display = 'inline';
  }
  if (isSortedByDateAsc) {
    const buttonDate = document.querySelector('.option2');
    const arrowDown = buttonDate.querySelector('.fa-chevron-down');
    const arrowUp = buttonDate.querySelector('.fa-chevron-up');
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'inline';
  } else {
    const buttonDate = document.querySelector('.option2');
    const arrowDown = buttonDate.querySelector('.fa-chevron-down');
    const arrowUp = buttonDate.querySelector('.fa-chevron-up');
    arrowUp.style.display = 'none';
    arrowDown.style.display = 'inline';
  }
  if (isSortedByTitleAsc) {
    const buttonTitle = document.querySelector('.option3');
    const arrowDown = buttonTitle.querySelector('.fa-chevron-down');
    const arrowUp = buttonTitle.querySelector('.fa-chevron-up');
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'inline';
  } else {
    const buttonTitle = document.querySelector('.option3');
    const arrowDown = buttonTitle.querySelector('.fa-chevron-down');
    const arrowUp = buttonTitle.querySelector('.fa-chevron-up');
    arrowUp.style.display = 'none';
    arrowDown.style.display = 'inline';
  }
}
//autre option pour displayArrows
// function setArrowDisplay(optionSelector, isAsc) {
//   const button = document.querySelector(optionSelector);
//   const arrowDown = button.querySelector('.fa-chevron-down');
//   const arrowUp = button.querySelector('.fa-chevron-up');
//   arrowDown.style.display = isAsc ? 'none' : 'inline';
//   arrowUp.style.display = isAsc ? 'inline' : 'none';
// }

// function displayArrows() {
//   setArrowDisplay('.option1', isSortedByPopularityAsc);
//   setArrowDisplay('.option2', isSortedByDateAsc);
//   setArrowDisplay('.option3', isSortedByTitleAsc);
// }

function toggleSortPopularity() {
  displayedMedias.sort((a, b) =>
    isSortedByPopularityAsc ? a.likes - b.likes : b.likes - a.likes
  );
  console.log('Tri par popularité', displayedMedias);
  isSortedByPopularityAsc = !isSortedByPopularityAsc;
  createMedias(photographer);
  displayArrows();
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
  displayArrows();
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
  displayArrows();
}

function toggleDropdownVisibility() {
  const options = document.querySelectorAll('.dropdown-buttons button');
  options.forEach((option, index) => {
    if (index > 0) {
      option.classList.add('not-displayed-options');
    }
  });
}

function toggleOptions() {
  // Sélectionne les éléments HTML qui représentent les options de tri.
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');

  // Ajoute un écouteur d'événement 'click' sur option1.
  option1.addEventListener('click', () => {
    option1.addEventListener('click', () => {
      if (!isDropdownOpen) {
        toggleDropdownVisibility();
        isDropdownOpen = true;
      } else {
        toggleSelectedOption(option1, option2, option3);
        toggleSortPopularity(); //
      }
    });
  });

  // Ajoute un écouteur d'événement 'click' sur option2, similaire à option1.
  option2.addEventListener('click', () => {
    toggleSelectedOption(option2, option1, option3);
  });

  // Ajoute un écouteur d'événement 'click' sur option3, similaire à option1 et option2.
  option3.addEventListener('click', () => {
    toggleSelectedOption(option3, option1, option2);
  });
}

// Définit la fonction qui gère le changement d'option sélectionnée.
function toggleSelectedOption(selectedOption, otherOption1, otherOption2) {
  // Vérifie le contenu textuel de l'option sélectionnée pour déterminer quelle fonction de tri appeler.
  if (selectedOption.textContent.includes('Popularité')) {
    // Si le texte inclut 'Popularité', appelle la fonction de tri par popularité.
    toggleSortPopularity();
  } else if (selectedOption.textContent.includes('Date')) {
    // Si le texte inclut 'Date', appelle la fonction de tri par date.
    toggleSortDate();
  } else if (selectedOption.textContent.includes('Titre')) {
    // Si le texte inclut 'Titre', appelle la fonction de tri par titre.
    toggleSortTitle();
  }

  // Affiche toutes les options en retirant la classe 'not-displayed-options' qui pourrait les cacher.
  selectedOption.classList.remove('not-displayed-options');
  otherOption1.classList.remove('not-displayed-options');
  otherOption2.classList.remove('not-displayed-options');

  // Réorganise les options en déplaçant l'option sélectionnée en première position dans le conteneur '.dropdown-buttons'.
  const dropdown = document.querySelector('.dropdown-buttons');
  dropdown.insertBefore(selectedOption, dropdown.firstChild);
}

displayArrows();
toggleOptions();
initPhotographerPage();
// Définit la fonction qui s'occupe de l'ajout des écouteurs d'événements sur les options.
document.addEventListener('click', (event) => {
  const dropdown = document.querySelector('.dropdown');
  const isDropdownClick = dropdown.contains(event.target);
  const options = document.querySelectorAll('.dropdown-buttons button');

  if (!isDropdownClick) {
    options.forEach((option, index) => {
      if (index > 0) {
        // ignorer la première option
        option.classList.add('not-displayed-options');
      }
    });
  }
});
