function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

//TODO: créer les variables utiles pour le formulaire
const submitBtn = document.getElementById("submit-button");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("your-message");
// TODO: créer les regex pour les champs prénom / nom / email
const nameRegex = /^[A-Za-zÀ-ÿ-]{2,}$/i;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// TODO: créer les event listener et fonctions qui vérifient la validité des champs
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
  return messageInput !== "";
}

// TODO: créer la fonction validate puis afficher les infos saisies dans la console
function validate() {
  return (
    firstNameValidation() &&
    lastNameValidation() &&
    emailValidation() &&
    messageValidation()
  );
}

function displayContactInfos() {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("your-message").value;
  if (true) {
    console.log(
      `Prénom: ${firstName}\nNom: ${lastName}\nEmail: ${email}\nMessage: ${message} `
    );
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    displayContactInfos();
  } else {
    console.log("Il y a une erreur dans la saisie du formulaire...");
  }
});
