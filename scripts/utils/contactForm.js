const modal = document.getElementById("contact_modal");
const page = document.getElementsByTagName("body")[0];
const submitBtn = document.getElementsByClassName("submit-button")[0];
const allFields = document.querySelectorAll("input, textarea");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const errorSpaces = document.querySelectorAll(".error-wrapper p");
const closeBtn = document.querySelector(".modal img");

function displayModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  page.setAttribute("aria-hidden", "true");
  allFields[0].focus();
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  page.setAttribute("aria-hidden", "false");
}

// form submission
submitBtn.addEventListener("click", (event) => {
  email.value = email.value.trim();
  clearErrorMessages();
  event.preventDefault();
  if (validateInput()) {
    logFormInput();
    clearInputFields();
    closeModal();
  } else addErrorMessage();
});

function validateInput() {
  let valid = true;
  for (let input of allFields) {
    if (!input.checkValidity()) {
      input.classList.add("invalid-input");
      input.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      input.classList.remove("invalid-input");
      input.setAttribute("aria-invalid", "false");
    }
  }
  return valid;
}

function addErrorMessage() {
  if (!firstName.value) {
    errorSpaces[0].innerText = "Veuillez renseigner un prénom.";
  } else if (!firstName.checkValidity()) {
    errorSpaces[0].innerText = "Veuillez renseigner un prénom valide.";
  }
  if (!lastName.value) {
    errorSpaces[1].innerText = "Veuillez renseigner un nom.";
  } else if (!lastName.checkValidity()) {
    errorSpaces[1].innerText = "Veuillez renseigner un nom valide.";
  }
  if (!email.value) {
    errorSpaces[2].innerText = "Veuillez renseigner une adresse électronique.";
  } else if (!email.checkValidity()) {
    errorSpaces[2].innerText =
      "Veuillez renseigner une adresse électronique valide.";
  }
  if (!message.checkValidity()) {
    errorSpaces[3].innerText =
      "Veuillez renseigner un message d'au moins six caractères.";
  }
}

function clearErrorMessages() {
  for (let errorSpace of errorSpaces) {
    errorSpace.innerText = "";
  }
}

function clearInputFields() {
  for (let input of allFields) {
    input.value = "";
  }
}

function logFormInput() {
  for (let input of allFields) {
    console.log(input.value);
  }
}

//close modal with escape key
window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeModal();
  } else return;
});
