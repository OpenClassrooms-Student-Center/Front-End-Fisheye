// Récupérer le nom du photographe
function getPhotographerName(photographer) {
  const $namePhotographer = document.getElementById("photographerName");
  $namePhotographer.textContent = `${photographer.name}`;

  return $namePhotographer;
}

const $formulaire = document.querySelector("form"); // Sélectionner le formulaire

// Ajouter un gestionnaire d'événement pour la soumission du formulaire
$formulaire.addEventListener("submit", handleFormSubmit);

// Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
  event.preventDefault(); // Empêcher la page de se rafraîchir

  const form = event.target; // Récupérer le formulaire

  // Récupérer les valeurs du formulaire
  const formValues = getFormValues(form);
  console.log(formValues);

  // Réinitialiser le formulaire et le fermer après soumission
  $formulaire.reset();
  closeModal("contact_modal");
}
