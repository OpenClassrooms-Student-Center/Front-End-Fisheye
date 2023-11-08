const $btnFormContactClose = document.getElementById("btnFormContactClose");
const $btnFormConfirmContactClose = document.getElementById(
  "btnFormConfirmContactClose"
);
const $formContact = document.getElementById("formContact");
const $firstName = document.getElementById("first");
const $lastName = document.getElementById("last");
const $email = document.getElementById("email");
const $message = document.getElementById("message");

// Bouton de fermeture du formulaire
$btnFormContactClose.addEventListener("click", () => {
  closeModal("contact_modal");
});
// Bouton de fermeture de la confirmation du formulaire
$btnFormConfirmContactClose.addEventListener("click", () => closeFormConfirm());

// Soumission du formulaire
$formContact.addEventListener("submit", (event) => validate(event));

// Champ du prénom
$firstName.addEventListener("input", () => validateFirstName());
// Champ du nom
$lastName.addEventListener("input", () => validateLastName());
// Champ de l'email
$email.addEventListener("input", () => validateEmail());
// Champ du message
$message.addEventListener("input", () => validateMessage());
