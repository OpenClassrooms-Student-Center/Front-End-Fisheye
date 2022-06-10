function displayModal() {
  const modal = document.getElementById("contact_modal");
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  header.setAttribute("aria-hidden", true);
  header.style.opacity = "0.4";
  main.setAttribute("aria-hidden", true);
  main.style.opacity = "0.4";
  modal.setAttribute("aria-hidden", false);
  modal.style.display = "block";
  document.getElementById("cross").focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const header = document.getElementById("header");
  const main = document.getElementById("main");
  header.setAttribute("aria-hidden", false);
  header.style.opacity = "1";
  main.setAttribute("aria-hidden", false);
  main.style.opacity = "1";
  modal.setAttribute("aria-hidden", true);
  modal.style.display = "none";
  document.getElementById("contact").focus();
}

//************VARIABLES*************
const submitBtn = document.getElementById("submit-button");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("your-message");

//************REGEX*************
const nameRegex = /^[A-Za-zÀ-ÿ-]{2,}$/i;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//***********ERRORS MESSAGES*********
const firstNameErrorMsg =
  "⚠️ Veuillez entrer au moins 2 caractères valides pour le champ prénom";

const lastNameErrorMsg =
  "⚠️ Veuillez entrer au moins 2 caractères valides pour le champ nom";

const emailErrorMsg = "⚠️ Veuillez saisir un email valide";

const messageErrorMsg = "⚠️ Veuillez saisir un message";

//***********ERRORS LOCATIONS*********
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const errorsLocations = [
  firstNameError,
  lastNameError,
  emailError,
  messageError,
];

const errorsMessages = [
  firstNameErrorMsg,
  lastNameErrorMsg,
  emailErrorMsg,
  messageErrorMsg,
];

const validations = [
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  messageValidation,
];

//************FUNCTIONS***********

// validation functions
function firstNameValidation() {
  return nameRegex.test(firstNameInput.value);
}
function lastNameValidation() {
  return nameRegex.test(lastNameInput.value);
}
function emailValidation() {
  return emailRegex.test(emailInput.value);
}
function messageValidation() {
  return messageInput.value !== "";
}

function validate() {
  return (
    firstNameValidation() &&
    lastNameValidation() &&
    emailValidation() &&
    messageValidation()
  );
}

// display inputs from user
function displayContactInfos() {
  console.log(
    `Prénom: ${firstNameInput.value}\nNom: ${lastNameInput.value}\nEmail: ${emailInput.value}\nMessage: ${messageInput.value} `
  );
}

// display errors messages
function displayErrorMsg(validation, errorLocation, errorMessage) {
  if (!validation()) {
    errorLocation.innerHTML = errorMessage;
    errorLocation.style.fontSize = "18px";
    errorLocation.style.fontWeight = "700";
  } else {
    errorLocation.innerHTML = "";
  }
}

function displayErrors() {
  for (let i = 0; i < validations.length; i++) {
    displayErrorMsg(validations[i], errorsLocations[i], errorsMessages[i]);
  }
}

//*********EVENT-LISTENERS***********
firstNameInput.addEventListener("input", () => {
  displayErrorMsg(firstNameValidation, firstNameError, firstNameErrorMsg);
});

// last name event
lastNameInput.addEventListener("input", () => {
  displayErrorMsg(lastNameValidation, lastNameError, lastNameErrorMsg);
});

// email event
emailInput.addEventListener("input", () => {
  displayErrorMsg(emailValidation, emailError, emailErrorMsg);
});

messageInput.addEventListener("input", () => {
  displayErrorMsg(messageValidation, messageError, messageErrorMsg);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    displayContactInfos();
    closeModal();
    document.getElementById("contact-form").reset();
  } else {
    displayErrors();
  }
});
