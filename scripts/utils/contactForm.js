// Get photograph name with title
const h1Element = document.getElementsByTagName('h1');
const h3Element = document.getElementsByTagName('h3');

// Open/Close Modal
const main = document.getElementById('main-wrapper');
const modal = document.getElementById("contact-modal");
const closeIcon = document.querySelector('.cross-close-modal');

function displayModal() {
	modal.style.display = "block";
    main.ariaHidden = true;
    modal.ariaHidden = false;
    modal.tabIndex = 0;
    modal.focus();
    const namePhotograph = h1Element[0].innerText;
    h3Element[0].innerText = namePhotograph;
}

function closeModal() {
    modal.style.display = "none";
    modal.ariaHidden = true;
    main.ariaHidden = false;
    main.tabIndex = 0;
    main.focus();
}

// Events Modal
closeIcon.addEventListener('click', closeModal);
closeIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        closeModal();
    }
})

modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
})

// FORM DOM
const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');

// VALID INPUTS
const validField = function(inputField, errorField, errorMessage, regex) {
    if (inputField.value.trim() === "" || inputField.value.length < 2 || (regex && !regex.test(inputField.value))) {
        errorField.textContent = errorMessage;
        errorField.ariaHidden = false;
        errorField.tabIndex = 0;
        inputField.classList.add("invalid");
        inputField.ariaInvalid = true;
        return false;
    } else {
        errorField.textContent = "";
        errorField.tabIndex = -1;
        inputField.classList.remove("invalid");
        inputField.removeAttribute('aria-invalid');
        return true;
    }
};

const validFirstname = function(inputFirstname) {
    const firstnameError = document.getElementById("error-firstname");
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;

    return validField(
        inputFirstname,
        firstnameError,
        "Veuillez saisir votre prénom, sans chiffre ni caractère spécial (2 caractères minimum).",
        nameRegex
    );
}

const validLastname = function(inputLastname) {
    const lastnameError = document.getElementById("error-lastname");
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i;

    return validField(
        inputLastname,
        lastnameError,
        "Veuillez saisir votre nom, sans chiffre ni caractère spécial (2 caractères minimum).",
        nameRegex
    );
}

const validEmail = function(inputEmail) {
    const emailError = document.getElementById("error-email");
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    return validField(
        inputEmail,
        emailError,
        "Veuillez saisir une adresse e-mail valide.",
        emailRegex
    );
}

const validMessage = function(inputMsg) {
    const messageError = document.getElementById('error-message');
    
    return validField(
        inputMsg,
        messageError,
        "Veuillez saisir un message.",
        null
    );
}

// Listen changes in Input
firstname.addEventListener('input', function() {
    validFirstname(this);
});
lastname.addEventListener('input', function() {
    validLastname(this);
});
email.addEventListener('input', function() {
    validEmail(this);
});
message.addEventListener('input', function() {
    validMessage(this);
});

// If inputs are valid, create msg with values
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

// SUBMIT FORM
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validFormAndGetValues();
    form.reset();
});