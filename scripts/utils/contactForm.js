function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// DOM Elements
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".close"); 
const formData = document.querySelectorAll(".formData");

// lance l'événement bouton de la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

modalCloseBtn.addEventListener("click", closeNav);
//// lance le formulaire modal
function launchModal() {
  modalbg.style.display = "block";
}
// Fermeture de la nav
function closeNav() {
  modalbg.style.display = "none";
}
const close = document.querySelectorAll("#close");
close.forEach((closed) => closed.addEventListener("click", closeModal));

// Modale de validation
function modalValidation() {
  const modalSuccess = document.querySelector("#modalSuccess");
  modalSuccess.style.display = "block";
  modalbg.style.display = "none";
}
// Function générique pour génèrer les erreurs
function error(message) {
  return message;
}

//Test du champs firstname (prénoms)
function firstnameValidation() {
  let firstName = document.querySelector("#first").value;
  const firstnameError = document.getElementById("firstNameErrorMsg");
  if (firstName === "") {
    firstnameError.innerText = error ("Champs obligatoire ");
    firstnameError.style.color = "red";
    firstnameError.style.fontSize = "12px"
    return false;
  } else if (firstName.trim().length < 2) {
    firstnameError.innerText = error("Veuillez entrer 2 caractères ou plus");
    firstnameError.style.color = "red";
    firstnameError.style.fontSize = "12px";

    return false;
  } else {
    firstnameError.innerText = error("");
    return true;
  }
}

//Test du champs lastname (nom de famille)
function lastnameValidation() {
  let lastName = document.querySelector("#last").value;
  const lastnameError = document.getElementById("lastNameErrorMsg");
  if (lastName === "") {
    lastnameError.innerText = error ("Champs obligatoire ");
    lastnameError.style.color = "red";
    lastnameError.style.fontSize = "12px"
    return false;
  } else if (lastName.trim().length < 2) {
    lastnameError.innerText = error("Veuillez entrer 2 caractères ou plus");
    lastnameError.style.color = "red";
    lastnameError.style.fontSize = "12px";

    return false;
  } else {
    lastnameError.innerText = error("");
    return true;
  }
}
//Test du champs email
function emailValidation() {
  let email = document.querySelector("#email").value;
  let regexEmail = /.+\@.+\..+/;
  const emailError = document.getElementById("emailErrorMsg");
  if (email === "") {
    emailError.innerText = error("Champs obligatoire ");
    emailError.style.color = "red";
    emailError.style.fontSize = "12px";

    return false;
  } else if (regexEmail.test(email) === false) {
    emailError.innerText = error("Merci d'inscrire une adresse mail correcte");
    emailError.style.color = "red";
    emailError.style.fontSize = "12px";
    return false;
  } else {
    emailError.innerText = error("");
    return true;
  }
}
function messageBoxValidation(){
let messageBoxValidation = document.querySelector("#messageBox").value;
const messageError = document.getElementById("messageBoxErrorMsg")
if (messageBoxValidation === ''){
  messageError.innerText = error("Champs obligatoire ");
  messageError.style.color = "red";
  messageError.style.fontSize = "12px";
}
return false
}

//Fonction qui vérifie que tous les champs du formulaire sont true en verifiant la valeur retournée par chaque fonction
function checkValidateAll() {
  firstnameValidation();
  lastnameValidation();
  emailValidation();
  messageBoxValidation();
}
function validate() {
  if (
    firstnameValidation() &&
    lastnameValidation() &&
    emailValidation() &&
    messageBoxValidation()
  ) {
    return true;
  }
  return false;
}

//Event au click submit pour permettre de valider le formulaire si tout est true
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validate()) {
    modalValidation();
  } else {
    checkValidateAll();
  }
});