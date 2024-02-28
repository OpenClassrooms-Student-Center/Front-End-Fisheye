// DOM Elements
const closeForm = document.querySelector(".close-modal");
const modal = document.getElementById("contact_modal");

closeForm.addEventListener("click", () => modal.style.display = "none");

const modalBgContent = document.querySelector(".content");
const messageValidation = document.querySelector(".message-validation");
const messageValidationBtnClose = document.querySelector(".message-validation_close");
const form = document.getElementById("form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");

/*
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeForm.addEventListener("click", closeModal);
messageValidationBtnClose.addEventListener("click", closeModal);
*/
/*
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  form.style.display ="block";
  modalBgContent.classList.remove("closed");
  messageValidation.style.display = 'none';
}
*/
/*
// close modal form
function closeModal() {
  modalBgContent.classList.add("closed");
  setTimeout(() => {
    modalbg.style.display = "none";
  }, 800);
}
*/

// Regex (expression régulière)
const regexName = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/g;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regexQuantity = /^[1-9]{0,1}[0-9]$/g;

// Message d'erreur des inputs
const message = {
  name: "Ce champ doit contenir minimum 2 caractères.",
  name2: "Ce champ ne doit pas contenir de caractères spéciaux.",
  email: "Veuillez renseigner une adresse email.",
  email2: "Veuillez renseigner une adresse email valide.",
  birthdate: "Vous devez avoir plus de 18 ans pour participer.",
  birthdate2: "Veullez renseigner une date de naissance valide.",
  birthdate3: "Veullez renseigner une date de naissance.",
  quantity: "Veuillez renseigner un nombre entre 0 et 99.",
  locations: "Veuillez renseigner un tournoi auquel participer.",
  conditions: "Veuillez accepter les conditions d'utilisation."
}

// Ajoute l'erreur
function addError(element, message) {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
  if(prenom || nom || email || birthdate || quantity) {
    element.style.border ="2.5px solid #e54858";
  }
};

// Enlève l'erreur
function removeError(element) {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
  if(prenom || nom || email || birthdate || quantity) {
    element.style.border ="none";
  }
};

// Vérifie prenom
function checkprenom(prenom, message) {
  if (prenom.value.length < 2) {
    addError(prenom, message.name);
    return false;
  }
  if(!prenom.value.match(regexName)) {
    addError(prenom, message.name2);
    return false;
  } else {
    removeError(prenom);
  }
  return true;
};

// Vérifie nom
function checknom(nom, message) {
  if (nom.value.length < 2) {
    addError(nom, message.name);
    return false;
  }
  if(!nom.value.match(regexName)) {
    addError(nom, message.name2);
    return false;
  } else {
    removeError(nom);
  }
  return true;
};

// Vérifie email
function checkEmail(email, message) {
  if(!email.value) {
    addError(email, message.email);
    return false;
  }
  if(!email.value.match(regexEmail)) {
    addError(email, message.email2);
    return false;
  } else {
    removeError(email);
  }
  return true;
}


// Vérifie conditions
function checkConditions(conditions, message) {
  if(!conditions.checked) {
    addError(conditions, message.conditions);
    return false;
  } else {
    removeError(conditions);
  }
  return true;
};

// Ajoute un évenement aux inputs du formulaire
prenom.addEventListener('change', () => {checkprenom(prenom, message)});
nom.addEventListener('change', () => {checknom(nom, message)});
email.addEventListener('change', () => {checkEmail(email, message)});
conditions.addEventListener('change', () => {checkConditions(conditions, message)});

// Ajoute un évenement au submit du formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isCheckedprenom = checkprenom(prenom, message);
  const isChecknom = checknom(nom, message);
  const isCheckedEmail = checkEmail(email, message);
  const isCheckConditions = checkConditions(conditions, message);

  if (isCheckedprenom && isChecknom && isCheckedEmail && isCheckConditions ) {
    messageValidation.style.display = 'block';
    form.style.display = "none";
    form.reset();
  }
});