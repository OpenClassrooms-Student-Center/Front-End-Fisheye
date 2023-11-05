let closeModalElement; // Déclarer une variable pour stocker l'élément modal à fermer

function displayModal(element) {
  // Récupérer les éléments du DOM
  const $modal = document.getElementById(element);
  const $overlay = document.querySelector(".overlay");

  // Ajouter des classes pour afficher la modal et l'overlay, et désactiver le défilement du corps
  $modal.classList.add("visible");
  $overlay.classList.add("visible");
  document.body.classList.add("modal-open");

  // Focus trap
  const focusableElements = $modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Fonction pour piéger le focus dans la modal
  function trapFocus(event) {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  // Fonction pour fermer la modal lorsque la touche Escape est pressée
  function closeOnEscape(event) {
    if (event.key === "Escape") {
      closeModal(closeModalElement);
    }
  }

  // Enregistrer l'élément modal à fermer dans la variable globale
  closeModalElement = element;

  // Ajouter des écouteurs d'événements pour la touche Escape et la navigation au clavier
  window.addEventListener("keydown", closeOnEscape);
  $modal.addEventListener("keydown", trapFocus);
  // Retarder l'opération de mise au point du premier champ d'input
  setTimeout(() => {
    firstFocusable.focus();
  }, 100);
}

function closeModal(element) {
  // Récupérer les éléments du DOM
  const $modal = document.getElementById(element);
  const $overlay = document.querySelector(".overlay");
  const $contactBtn = document.getElementById("contact_button");
  const $firstArticle = document.querySelector(
    "#media-container-main > article > figure > :first-child"
  );

  // Supprimer les classes pour masquer la modal et l'overlay, et réactiver le défilement du corps
  $modal.classList.remove("visible");
  $overlay.classList.remove("visible");
  document.body.classList.remove("modal-open");
  // Replacement du focus après fermeture modal
  if (element === "contact_modal") {
    $contactBtn.focus(); //Sur le bouton ouvrant la modal formulaire
  } else if (element === "lightbox_modal") {
    $firstArticle.focus(); //Sur le 1er média de la liste de la gallerie
  }
}
