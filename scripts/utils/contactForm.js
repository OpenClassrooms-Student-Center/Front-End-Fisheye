// Récupérer le nom du photographe
function getPhotographerName(photographer) {
  const $namePhotographer = document.getElementById("photographerName");
  $namePhotographer.textContent = `${photographer.name}`;

  return $namePhotographer;
}

// Sélectionner le formulaire
const $formulaire = document.querySelector("form");

// Ajouter un gestionnaire d'événement pour la soumission du formulaire
$formulaire.addEventListener("submit", handleFormSubmit);

// Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
  // Empêcher la page de se rafraîchir
  event.preventDefault();

  // Récupérer le formulaire
  const form = event.target;

  // Récupérer les valeurs du formulaire
  const formValues = getFormValues(form);
  console.log(formValues);

  // Réinitialiser le formulaire et le fermer après soumission
  $formulaire.reset();
  closeModal("contact_modal");
}
