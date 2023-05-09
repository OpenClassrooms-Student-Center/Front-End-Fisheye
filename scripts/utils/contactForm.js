// Open/Close Modal
function displayModal() {
    const modal = document.getElementById("contact-modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact-modal");
    modal.style.display = "none";
}

// FORM DOM
const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');

const firstnameError = document.getElementById("error-firstname");
const lastnameError = document.getElementById("error-lastname");
const emailError = document.getElementById("error-email");
const messageError = document.getElementById('error-message');

// Regex
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;
const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// Valid Inputs
const validFirstname = function(inputFirstname) {
    if (inputFirstname.value.trim() === "" || inputFirstname.value.length < 2) {
        firstnameError.textContent = "Veuillez saisir votre prénom (2 caractères minimum).";
        firstname.classList.add("invalid");
        return false;
    } else if (!nameRegex.test(inputFirstname.value)) {
        firstnameError.textContent = "Veuillez saisir un prénom valide, sans chiffre, ni caractère spécial.";
        firstname.classList.add("invalid");
        return false;
    } else {
        firstnameError.textContent = "";
        firstname.classList.remove("invalid");
        return true;
    }
}

const validLastname = function(inputLastname) {
    if (inputLastname.value.trim() === "" || inputLastname.value.length < 2) {
        lastnameError.textContent = "Veuillez saisir votre nom (2 caractères minimum).";
        lastname.classList.add("invalid");
        return false;
    } else if (!nameRegex.test(inputLastname.value)) {
        lastnameError.textContent = "Veuillez saisir un nom valide, sans chiffre, ni caractère spécial.";
        lastname.classList.add("invalid");
        return false;
    } else {
        lastnameError.textContent = "";
        lastname.classList.remove("invalid");
        return true;
    }
}

const validEmail = function(inputEmail) {
    if (inputEmail.value.trim() === "" || !emailRegex.test(email.value)) {
        emailError.textContent = "Veuillez saisir une adresse e-mail valide.";
        email.classList.add("invalid");
        return false;
    } else {
        emailError.textContent = "";
        email.classList.remove("invalid");
        return true;
    }
}

const validMessage = function(inputMsg) {
    if (inputMsg.value.trim() === "") {
      messageError.textContent = "Veuillez saisir un message.";
      message.classList.add("invalid");
      return false;
    } else {
      messageError.textContent = "";
      message.classList.remove("invalid");
      return true;
    }
}

// Listen changes in Input
firstname.addEventListener('change', function() {
    validFirstname(this);
});
lastname.addEventListener('change', function() {
    validLastname(this);
});
email.addEventListener('change', function() {
    validEmail(this);
});
message.addEventListener('change', function() {
    validMessage(this);
});

// If form is valid, create msg with values
function validFormAndGetValues() {
    if (validFirstname(firstname) && validLastname(lastname) && validEmail(email) && validMessage(message)) {
        const userMsg = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            message: message.value
        };

        console.log(userMsg);
        closeModal();
    } else {
        return;
    }
}

// Submit form
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validFormAndGetValues();
});