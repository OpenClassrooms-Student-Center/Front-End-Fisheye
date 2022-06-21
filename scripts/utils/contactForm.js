const modal = document.querySelector(".contact_modal");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const error = {
    prenom: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    nom: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    mail: 'Veuillez saisir un email valide.',
    message : 'Vous devez entrer un message.'
  }

// Conditions pour valider les données
function isPrenomValid() {
let regex = /^([a-zA-Z\-]+)$/;
return firstName.value !== null && firstName.value.length >= 2 && regex.test(firstName.value) == true;    
};

function isNomValid() {
    let regex = /^([a-zA-Z\-]+)$/;
    return lastName.value !== null && lastName.value.length >= 2 && regex.test(lastName.value) == true;
};

function isMailValid() {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      return regex.test(email.value);
  };

function isMessageValid() {
    return message.value !== null && message.value.length >= 2;
};

// Ajout ou suppression message d'erreur selon les données du champ formulaire
function unvalidInput(element, message) {
	element.parentNode.setAttribute("data-error-visible", true);
	element.parentNode.setAttribute("data-error", message);
}

function validInput(element) {
	element.parentNode.removeAttribute("data-error-visible");
	element.parentNode.removeAttribute("data-error");
}

document.querySelector(".contact_form").addEventListener("click", displayModal);
document.querySelector(".close_form").addEventListener("click", closeModal);
document.querySelector(".send_form").addEventListener("click", (e) => {
    e.preventDefault();

    if (isPrenomValid()) {
        validInput(firstName);
    } else {
    unvalidInput(firstName, error.prenom);
    }

    if (isNomValid()) {
            validInput(lastName);
        } else {
        unvalidInput(lastName, error.nom);
    }

    if (isMailValid()) {
            validInput(email);
        } else {
        unvalidInput(email, error.mail);
    }

    if (isMessageValid()) {
            validInput(message);
        } else {
        unvalidInput(message, error.message);
    }

    if (isPrenomValid() && isNomValid() && isMailValid() && isMessageValid()){
        const userInputs = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value,
        };
    console.log("User inputs:", userInputs);
    closeModal();
  } 
});


function displayModal() {
    modal.classList.add('fade-out');
	modal.style.display = "block";
    window.setTimeout(() => {
        modal.classList.remove('fade-out');
      }, 50)
}

function closeModal() {
    modal.classList.add('fade-out');
    window.setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove('fade-out');
      }, 300)
}
