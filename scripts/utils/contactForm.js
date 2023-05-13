/////////////////////////////////////////////// RECUPERATION DES ELEMENTS //////////////////////////////////////////

//Récupération de la modale
const modal = document.querySelector(".contact_modal");
const Body = document.getElementById("main-photographer"); // Ajout de la lightbox au body
const contentmodal = document.querySelector(".content");
//Récupération  des boutons de la modale
const openModalBtn = document.querySelector(".contact_button"); // Bouton d'ouverture de la modale
const closeModalBtn = document.querySelector(".close"); // Bouton de fermeture de la modale
const btn_submit = document.querySelector(".submit-form-btn"); // Bouton d'envoi du formulaire

//////////////////////////////////////////////// ELEMENTS A VERIFIER //////////////////////////////////////////

// Récupération des valeurs des éléments du formulaire
const inputFirstName = document.forms["reserve"]["first"]; // Champ input prénom
const inputLastName = document.forms["reserve"]["last"]; // Champ input nom
const inputEmail = document.forms["reserve"]["email"]; // Champ input e-mail
const inputText = document.forms["reserve"]["txtMsg"]; // Champ input date de naissance

//Régex pour la validation des champs texte
const regexpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Régex pour la validation de l'email
const regexpFirstName = /^[a-zA-Z\s]+$/; // Régex pour la validation du prénom
const regexpLastName = /^[a-zA-Z\s]+$/; // Régex pour la validation du nom de famille

// Liste des objets à vérifier + conditions + messages de retour en cas d'erreur

const formfieldsObjects = [
  {
    // Objet Prénom
    formfield: inputFirstName, // Champ input prénom
    condition: () => !validateFirstName(), // Vérifier si le prénom est valide (fonction validateFirstName
    message: "", // Message de retour en cas d'erreur
  },
  {
    // Objet Nom de Famille
    formfield: inputLastName, // Champ input nom de famille
    condition: () => !validateLastname(), // Vérifier si le nom de famille est valide (fonction validateLastname
    message: "", // Message de retour en cas d'erreur
  },

  {
    // Objet E-mail
    formfield: inputEmail, // Champ input e-mail
    condition: () => !validateEmail(), // Vérifier si l'email est valide
    message: "Veuillez entrer une adresse e-mail valide.", // Message de retour en cas d'erreur
  },
  {
    // Objet texte Contact
    formfield: inputText, // Champ input message
    condition: () => !validateText(), // Vérifier si le message est valide (fonction validateText)
    message: "Veuillez entrer une adresse e-mail valide.", // Message de retour en cas d'erreur
  },
];

// //etat de soumission du formulaire
let alreadyValidate = false;
//////////////////////////////////////////////// GESTION MODALE //////////////////////////////////////////

//// OUVERTURE MODALE

function displayModal() {
  // Lancement de la modale
  modal.setAttribute("aria-hidden", "false"); // Affichage de la modale
  Body.setAttribute("aria-hidden", "true"); // Masquage du body
  if (alreadyValidate) {
    // Si le formulaire a été validé alors il raffiche le message de confirmation sinon il affiche la modale vierge
    modal.classList.add("visible"); // Affichage de la modale
  } else {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false"); // Affichage de la modale
    Body.setAttribute("aria-hidden", "true"); // Masquage du body
    closeModalBtn.focus(); // Focus sur le bouton de fermeture de la modale

    modal.classList.add("visible"); // Affichage de la modale // apparition progressive via l'opacity
  }
}

//// FERMETURE MODALE

// Événement de fermeture de la modale
closeModalBtn.addEventListener("click", closeForm); // Fermeture de la modale au clic sur la X

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === 27) {
    if (modal) {
      closeForm();
    }
  }
}); // Fermeture de la modale au clic sur la touche Echap
document.addEventListener("click", (e) => {
  if (e.target == modal) closeForm();
}); // Fermeture de la modale au clic en dehors de la modale

function closeForm() {
  // Fermeture de la modale

  setTimeout(() => {
    modal.classList.remove("visible"); // Disparition progressive via l'opacity
    modal.classList.add("hidden"); // Disparition de la modale
  }, 100); // Fermeture de la modale au bout de 500ms
}

//////////////////////////////////////////////// GESTION DES CHAMPS DU FORMULAIRE //////////////////////////////////////////

document.forms["reserve"].addEventListener("submit", confirmValidation); // Fonction de confirmation de la modale
document.forms["reserve"].addEventListener(
  // Fonction de validation des données des champs inut
  "submit",
  (e) => {
    e.preventDefault(); // Annuler l'envoi du formulaireavant la validation
    validate(); // Vérifier si les données sont valides
  }
);

function confirmValidation() {
  // Fonction de confirmation de la modale

  if (validate()) {
    // Si la fonction de validation retourne true
    console.log(inputFirstName.value);
    console.log(inputLastName.value);
    console.log(inputEmail.value);
    console.log(inputText.value);
    alreadyValidate = true; // Le formulaire est validé
    return;
  }
}

// Fonction de validation des données des champs input
function validateFirstName() {
  // Fonction de validation du prénom
  if (inputFirstName.value.trim().length < 2) {
    // Si le prénom est inférieur à 2 caractères
    formfieldsObjects[0].message =
      "Veuillez entrer 2 lettres ou plus pour le prénom."; // Message de retour en cas d'erreur
    return false; // Si le prénom est invalide
  }
  if (!regexpFirstName.test(inputFirstName.value.trim())) {
    // Si le prénom contient des chiffres ou des espaces vides
    formfieldsObjects[0].message =
      "Veuillez entrer uniquement des lettres pour le prénom."; // Message de retour en cas d'erreur
    return false; // Si le prénom est invalide
  } else {
    return true; // Si le prénom est valide
  }
}
function validateLastname() {
  // Fonction de validation du nom
  if (
    inputLastName.value.trim().length < 2 ||
    inputLastName.value.trim() === ""
  ) {
    // Si le nom est inférieur à 2 caractères
    formfieldsObjects[1].message =
      "Veuillez entrer au minimum 2 lettres ou plus pour le nom."; // Message de retour en cas d'erreur
    return false; // Si le nom est invalide
  }
  if (!regexpLastName.test(inputLastName.value.trim())) {
    // Si le nom contient des chiffres ou des espaces vides
    formfieldsObjects[1].message =
      "Veuillez entrer uniquement des lettres pour le nom."; // Message de retour en cas d'erreur
    return false; // Si le nom est invalide
  } else {
    return true; // Si le nom est valide
  }
}

// // Fonction de validation de l'email
function validateEmail() {
  if (!regexpEmail.test(inputEmail.value.trim())) {
    // Si l'email est invalide
    formfieldsObjects[2].message = "Veuillez entrer une adresse mail valide."; // Message de retour en cas d'erreur
    return false; // Si l'email est invalide
  } else {
    return true; // Si l'email est valide
  }
}

//fonction validation du texte
function validateText() {
  if (inputText.value.trim().length < 10) {
    // Si le texte est inférieur à 10 caractères
    formfieldsObjects[3].message = "Veuillez entrer au minimum 50 caractères."; // Message de retour en cas d'erreur
    return false; // Si le texte est invalide
  } else {
    return true; // Si le texte est valide
  }
}

function validate() {
  // Fonction de validation globale des données des champs input
  let formIsTrue = true; // Variable de validation globale du formulaire
  for (let i = 0; i < formfieldsObjects.length; i++) {
    // Boucle de validation des données des champs input
    let condition = formfieldsObjects[i].condition(); // Récupération de la condition de validation
    let message = formfieldsObjects[i].message; // Récupération du message d'erreur
    if (condition) {
      // Si la condition de validation est fausse

      console.log("formNotOk = " + formfieldsObjects[i].message); // Affichage du message d'erreur
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error",
        message
      ); // Affichage du message d'erreur
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error-visible",
        "true"
      );
      formfieldsObjects[i].formfield.parentElement.classList.add("error"); // Affichage du message d'erreur
      formfieldsObjects[i].formfield.focus(); // Focus sur le champ input
      formIsTrue = false;
    } else {
      console.log("formOk = " + formfieldsObjects[i].formfield.value); // Affichage de la valeur du champ input
      formfieldsObjects[i].formfield.parentElement.removeAttribute(
        "data-error"
      ); // Suppression du message d'erreur
      formfieldsObjects[i].formfield.parentElement.setAttribute(
        "data-error-visible",
        "false"
      );
      formfieldsObjects[i].formfield.parentElement.classList.remove("error"); // Suppression du message d'erreur
    }
  }
  return formIsTrue; // Retourne la valeur de validation globale du formulaire
}

export { displayModal };
