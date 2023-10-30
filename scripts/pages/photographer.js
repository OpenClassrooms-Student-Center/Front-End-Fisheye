// Fonction factory pour créer les médias
function createMedia(data) {
  const commonData = {
    id: data.id,
    photographerId: data.photographerId,
    title: data.title,
    likes: data.likes,
    date: data.date,
    price: data.price,
  };

  if (data.image) {
    return {
      ...commonData,
      type: "photo",
      source: `assets/galleries/${data.image}`,
    };
  } else if (data.video) {
    return {
      ...commonData,
      type: "video",
      source: `assets/galleries/${data.video}`,
    };
  }
}

// Fonction pour créer l'élément DOM d'un média
function createMediaElement(media) {
  const $mediaElement = document.createElement("div");
  const isVideo = media.type === "video";

  $mediaElement.innerHTML = `
      <div class="media-card ${isVideo ? "video" : ""}">
        <img src="${media.source}" alt="${media.title}">
        </div>
        <div class="media-card-description">
            <p>${media.title}</p>
            <p>${media.likes} <i class="fa-solid fa-heart"></i></p>
        </div>
    `;
  return $mediaElement;
}

// Fonction asynchrone pour récupérer les données depuis un fichier JSON
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Fonction principale pour initialiser la page du photographe
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromURL();

  if (photographerId) {
    // Récupérer les données du photographe
    const photographer = await fetchData("/data/photographers.json").then(
      (data) => data.photographers.find((p) => p.id === photographerId)
    );

    // Créer le template du photographe
    const photographerTemplate = photographerDetailTemplate(photographer);
    displayPhotographerHeader(photographerTemplate);
    // Récupérer les médias du photographe
    const photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );

    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMedia);

    // Afficher les médias
    displayMedia(mediaInstances);
  }
}

// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"), 10);
}

// Fonction pour afficher le template du photographe dans le DOM
function displayPhotographerHeader(photographerTemplate) {
  const $main = document.getElementById("main");
  $main.appendChild(photographerTemplate);
}

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");

  // Utilisation de la fonction pour créer l'élément DOM et l'afficher
  mediaInstances.forEach((media) => {
    const $mediaElement = createMediaElement(media);
    $mediaContainer.appendChild($mediaElement);
  });
}

// Appeler la fonction principale pour initialiser la page du photographe
initPhotographerPage();

// Gestion de la listbox du tri de la galerie du photographe
const selectContainer = document.querySelector('.custom-select');
const selectedOption = document.getElementById('selectedOption');
const selectOptions = document.getElementById('selectOptions');

function openSelectOptions() {
  selectContainer.setAttribute('aria-expanded', 'true');
  document.addEventListener('click', closeSelectOptionsOnClickOutside);
}

function closeSelectOptions() {
  selectContainer.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeSelectOptionsOnClickOutside);
  selectContainer.focus();
}

function closeSelectOptionsOnClickOutside(event) {
  if (!selectContainer.contains(event.target)) {
    closeSelectOptions();
  }
}

selectContainer.addEventListener('click', function () {
  if (selectContainer.getAttribute('aria-expanded') === 'true') {
    closeSelectOptions();
  } else {
    openSelectOptions();
  }
});

selectOptions.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    selectedOption.textContent = event.target.textContent;
    closeSelectOptions();

    // Tu peux également déclencher ici l'événement de tri en fonction de la valeur sélectionnée.
    const selectedValue = event.target.getAttribute('data-value');
    // Fais quelque chose avec la valeur sélectionnée (tri, etc.).
    console.log('Option sélectionnée :', selectedValue);
  }
});

// Fonction pour ouvrir la boîte d'options avec le clavier
function openSelectOptionsWithKeyboard(event) {
  if (event.key === 'Enter') {
    openSelectOptions();
  }
}

// Événement pour ouvrir la boîte d'options avec le clavier
selectContainer.addEventListener('keydown', openSelectOptionsWithKeyboard);

// Fonction pour gérer la navigation dans la liste avec le clavier
function navigateSelectOptionsWithArrows(event) {
  const options = document.querySelectorAll('#selectOptions li');
  const selectedIndex = Array.from(options).findIndex((option) => option === document.activeElement);

  if (event.key === 'ArrowDown' && selectedIndex < options.length - 1) {
    options[selectedIndex + 1].focus();
  } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
    options[selectedIndex - 1].focus();
  } else if (event.key === 'ArrowDown' && selectedIndex === options.length - 1) {
    options[0].focus();
  } else if (event.key === 'ArrowUp' && selectedIndex === 0) {
    options[options.length - 1].focus();
  }

  event.preventDefault(); // Empêcher le défilement de la page avec les touches fléchées
}

// Événement pour gérer la navigation avec le clavier
selectContainer.addEventListener('keydown', navigateSelectOptionsWithArrows);

// Fonction pour gérer la sélection avec la touche Entrée
function selectOptionWithEnter(event) {
  if (event.key === 'Enter') {
    const selectedValue = document.activeElement.getAttribute('data-value');
    selectedOption.textContent = document.activeElement.textContent;
    closeSelectOptions();

    // Faites quelque chose avec la valeur sélectionnée (tri, etc.).
    console.log('Option sélectionnée :', selectedValue);
  }
}

// Événement pour gérer la sélection avec la touche Entrée
selectOptions.addEventListener('keydown', selectOptionWithEnter);

// Événement pour fermer la boîte d'options avec le clavier lorsque la touche Entrée est utilisée sur une option
selectOptions.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    selectOptionWithEnter(event);
  }
});

