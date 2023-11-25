/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable max-len */
/* ********************************* START GESTION SOUMISSION FORMULAIRE ********************************* */
// DOM Elements
const $formContent = document.querySelector(".modal-contact");
const $form = document.getElementById("formContact");
const $confirmDiv = document.getElementById("confirm");

// Fonction pour réinitialiser le formulaire
function resetForm() {
  $form.reset();
}

// Fonction pour afficher la confirmation
function showConfirmation() {
  //   // Récupérer les valeurs du formulaire
  const formValues = getFormValues($form);
  console.log(formValues);
  // Cache le formulaire
  $formContent.style.display = "none";
  // Affiche la div de confirmation
  $confirmDiv.classList.add("active", "modal-contact");
  // Réinitialise le formulaire après la confirmation
  resetForm();
}
function closeFormConfirm() {
  $formContent.style.display = "block";
  $confirmDiv.classList.remove("active");
  resetForm();
  closeModal('contact_modal')
}

// Form submit
function validate(event) {
  event.preventDefault();
  const isFormValid =
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validateMessage();

  if (isFormValid) {
    showConfirmation();
  }
}

/* ********************************* END GESTION SOUMISSION FORMULAIRE ********************************* */
