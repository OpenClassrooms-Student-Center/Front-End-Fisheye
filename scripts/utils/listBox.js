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

    // Déclencher ici l'événement de tri en fonction de la valeur sélectionnée.
    const selectedValue = event.target.getAttribute('data-value');
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