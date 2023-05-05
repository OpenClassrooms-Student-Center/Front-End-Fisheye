//1. récupérer les elements du DOM
const body = document.getElementById("body");
let contactBtn = document.getElementById("contactBtn");
const mainWrapper = document.getElementById("main");
let modalForm = document.getElementById("formModal");
const closeBtn = document.getElementById("closeBtn");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const focusableElements = `img, input, button`;

const firstFocusableElement = modalForm.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modalForm.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; //

//3. récupérer le bouton ENVOYER
let sendForm = document.getElementById("send");

// Mettre un ADD EVENT LISTENER sur le bouton CONTACTEZ MOI
contactBtn.addEventListener("click", displayModal);

// Open le formulaire
function displayModal() {
  modalForm.style.display = "flex ";
  modalForm.setAttribute("aria-hidden", "false");
  mainWrapper.style.display = "none ";
  mainWrapper.setAttribute("aria-hidden", "true");
}

// Close le formulaire
function closeModal() {
  modalForm.style.display = "none ";
  modalForm.setAttribute("aria-hidden", "true");
  mainWrapper.style.display = "block ";
}

// Navigation inside formulaire
document.addEventListener("keydown", function (e) {
  let isTabPressed = e.key === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (document.activeElement === lastFocusableElement) {
    // if focused has reached to last focusable element then focus first focusable element after pressing tab
    firstFocusableElement.focus(); // add focus for the first focusable element
    e.preventDefault();
  }
});

firstFocusableElement.focus();

// Close formulaire when escape key is pressed
window.addEventListener("keydown", consoleKey);

function consoleKey(event) {
  if (event.key === "Escape" || event.code === "Escape") {
    closeModal();
  }
}

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameOk = verifyName(firstName);
  const lastNameOk = verifyName(lastName);
  const emailOk = verifyEmail();
  const msgOk = verifyMessage();

  if (firstNameOk && lastNameOk && emailOk && msgOk === true) {
    modalForm.classList.remove("visible");
    return true;
  }
});

//Vérification champs non null
function verifyName(element) {
  const elementValue = element.value.trim();
  console.log(elementValue);
  if (elementValue === "") {
    console.log("Le champs est vide");
  }
  return true;
}

function verifyEmail() {
  const emailValue = email.value.trim();
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  console.log(emailValue);
  if (emailValue != emailValue.match(mailformat)) {
    console.log("L'email est invalide");
  }
  return true;
}

function verifyMessage(element) {
  const message = document.getElementById("yourmessage").value;
  console.log(message);
  if (message === "") {
    console.log("Le champs est vide");
  }
  return true;
}
