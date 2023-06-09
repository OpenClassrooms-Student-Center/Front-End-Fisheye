const modal = document.getElementById("contact_modal");
const submit = document.querySelector('#submit');
const form = document.querySelector('form');
const inputPrenom = document.querySelector('#prenom');
const inputNom = document.querySelector('#nom');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#message');

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

submit.addEventListener('click', (e) => {
    document.getElementById("demo").innerHTML = '';

    if (!inputMessage.checkValidity()) {
        document.getElementById("demo").innerHTML = inputMessage.validationMessage;
        inputMessage.setAttribute("data-error", "true");
        e.preventDefault();
    } else {
        inputMessage.setAttribute("data-error", "false");
    }

    if (!inputEmail.checkValidity()) {
        document.getElementById("demo").innerHTML = inputEmail.validationMessage;
        inputEmail.setAttribute("data-error", "true");
        e.preventDefault();
    } else {
        inputEmail.setAttribute("data-error", "false");
    }

    if (!inputNom.checkValidity()) {
        document.getElementById("demo").innerHTML = inputNom.validationMessage;
        inputNom.setAttribute("data-error", "true");
        e.preventDefault();
    } else {
        inputNom.setAttribute("data-error", "false");
    }

    if (!inputPrenom.checkValidity()) {
        document.getElementById("demo").innerHTML = inputPrenom.validationMessage;
        inputPrenom.setAttribute("data-error", "true");
        e.preventDefault();
    } else {
        inputPrenom.setAttribute("data-error", "false");
    }

    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        console.log(value);
    }

    e.preventDefault();
});