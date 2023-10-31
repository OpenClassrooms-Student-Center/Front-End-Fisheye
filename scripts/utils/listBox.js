// Noeuds de la listbox
const $selectContainer = document.querySelector(".custom-select");
const $selectedOption = document.getElementById("selectedOption");
const $selectOptions = document.getElementById("selectOptions");

// *************************** START INFOS ACCESSIBILITE ***************************
// Information accessible que la listbox est ouverte
function openSelectOptions() {
  $selectContainer.setAttribute("aria-expanded", "true");
}
// Information accessible que la listbox est fermée
function closeSelectOptions() {
  $selectContainer.setAttribute("aria-expanded", "false");
  $selectContainer.focus(); //Permet de garder le focus et de rouvrir la listbox
}
// *************************** END INFOS ACCESSIBILITE ***************************

// *************************** START GESTION COMPORTEMENT LISTBOX SOURIS ***************************
// Ouverture/fermeture listbox
document.addEventListener("click", function (event) {
  const isInsideSelectContainer = $selectContainer.contains(event.target);
  isInsideSelectContainer ? openSelectOptions() : closeSelectOptions();
});

$selectOptions.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    $selectedOption.textContent = event.target.textContent;
    setTimeout(closeSelectOptions, 0); //Sans ce différé, la listbox ne se fermerait pas

    // Evénement de tri en fonction de la valeur sélectionnée.
    const selectedValue = event.target.getAttribute("data-value");
    console.log("Option sélectionnée :", selectedValue);
  }
});
// *************************** END GESTION COMPORTEMENT LISTBOX SOURIS ***************************

// *************************** START GESTION COMPORTEMENT LISTBOX CLAVIER ***************************

// Événement pour ouvrir la boîte d'options avec le clavier
$selectContainer.addEventListener("keydown", openSelectOptionsWithKeyboard);

// Événement pour gérer la navigation avec le clavier
$selectContainer.addEventListener("keydown", navigateSelectOptionsWithArrows);

// Événement pour gérer la sélection avec la touche Entrée
$selectOptions.addEventListener("keydown", selectOptionWithEnter);

// Fonction pour ouvrir la boîte d'options avec le clavier
function openSelectOptionsWithKeyboard(event) {
  const isEnterKey = event.key === "Enter";
  const isListItem = event.target.tagName === "LI";

  if (isEnterKey && !isListItem) {
    openSelectOptions();
  }
}

// Fonction pour gérer la navigation dans la liste avec le clavier
function navigateSelectOptionsWithArrows(event) {
  const options = document.querySelectorAll("#selectOptions li");
  const selectedIndex = Array.from(options).findIndex(
    (option) => option === document.activeElement
  );

  const isFirstOption = selectedIndex === 0;
  const isLastOption = selectedIndex === options.length - 1;

  if (event.key === "ArrowDown" && !isLastOption) {
    options[selectedIndex + 1].focus();
  } else if (event.key === "ArrowUp" && !isFirstOption) {
    options[selectedIndex - 1].focus();
  } else if (event.key === "ArrowDown" && isLastOption) {
    options[0].focus();
  } else if (event.key === "ArrowUp" && isFirstOption) {
    options[options.length - 1].focus();
  }

  event.preventDefault(); // Empêcher le défilement de la page avec les touches fléchées
}

// Fonction pour gérer la sélection avec la touche Entrée
function selectOptionWithEnter(event) {
  if (event.key === "Enter") {
    const selectedValue = document.activeElement.getAttribute("data-value");
    $selectedOption.textContent = document.activeElement.textContent;
    closeSelectOptions();
  }
}

// *************************** END GESTION COMPORTEMENT LISTBOX CLAVIER ***************************
