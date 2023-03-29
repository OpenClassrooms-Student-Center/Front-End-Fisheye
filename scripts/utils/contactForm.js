"use_strict";

// DOM elements
const modalElt = document.getElementById("contact_modal");
const firstNameElt = document.querySelector("form div:nth-child(2) input");
const lastNameElt = document.querySelector("form div:nth-child(3) input");
const emailElt = document.querySelector("form div:nth-child(4) input");
const messageElt = document.querySelector("form div:nth-child(5) textarea");
const formElt = document.querySelector("form");

// functions
function photographerContactFormFactory(photographer) {
    const [{ name }] = photographer;

    function getUserContactFormDOM() {
        const titleFormElt = document.querySelector("#contact_modal h2");
        titleFormElt.style.textAlign = "left";
        const namePhotographerFormElt = document.createTextNode(" " + name);
        titleFormElt.appendChild(namePhotographerFormElt);
    }

    return { getUserContactFormDOM }
}

// open modal
function displayModal() {
	modalElt.style.display = "block";
}

// close modal
function closeModal() {
    modalElt.style.display = "none";
    location.reload();
}

function validateFirstName() {
    const removeErrorMessage = document.querySelector("form div:nth-child(2) span");

    if (!firstNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divFirstElt = document.querySelector("form div:nth-child(2)");
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(2) span");
        const errorMessage = "Prénom obligatoire avec au minimum 2 lettres";

        createErrorMessage(divFirstElt, errorMessage, spanErrorMessage);

        return false;
    } 
    else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true
}

function validateLastName() {
    const removeErrorMessage = document.querySelector("form div:nth-child(3) span");
    
    if (!lastNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divLastElt = document.querySelector("form div:nth-child(3)");
        const errorMessage = "Nom obligatoire avec au minimum 2 lettres";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(3) span");
        
        createErrorMessage(divLastElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

function validateEmail() {
    const removeErrorMessage = document.querySelector("form div:nth-child(4) span");
    
    if (!emailElt.value.match(/^[\w\-.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/)) {
        const divEmailElt = document.querySelector("form div:nth-child(4)");
        const errorMessage = "Veuillez renseigner une adresse mail valide";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(4) span");
        
        createErrorMessage(divEmailElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

function validateMessage() {
    const removeErrorMessage = document.querySelector("form div:nth-child(5) span");
    
    if (!messageElt.value.match(/^[\w\-.?!+*\/\n, ()&#:;'"áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{20,700}$/)) {
        const divMessageElt = document.querySelector("form div:nth-child(5)");
        const errorMessage = "Votre message doit etre compris entre 20 et 700 caractères";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(5) span");
        
        createErrorMessage(divMessageElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

function createErrorMessage(divElt, errorMessage, spanErrorMessage) {
    const spanElt = document.createElement("span");
    spanElt.textContent = errorMessage;
    divElt.appendChild(spanElt);

    if (spanErrorMessage.length > 0) {
        spanElt.remove();
    }
}

function displaySuccessMessage() {
    const successMessageElt = document.querySelector("form div:nth-child(1) span");
    successMessageElt.textContent = "Votre message ainsi vos coordonnées sont affichés avec succès dans la console";
    successMessageElt.style.color = "#901C1C";
    successMessageElt.style.width = "100%";
    successMessageElt.style.fontSize = "1.3rem";
}

// display user data in console
function displayUserDataInConsole() {

    const firstName = validateFirstName();
    const lastName = validateLastName();
    const email = validateEmail();
    const message = validateMessage();
    
    if (firstName && lastName && email && message) {
        console.log(" ================================ ");
        console.log("Prénom: " + firstNameElt.value);
        console.log("Nom: " + lastNameElt.value);
        console.log("Email: " + emailElt.value);
        console.log("Message: " + messageElt.value);

        formElt.addEventListener("submit", (event) => {
            event.preventDefault();
            formElt.reset();
            displaySuccessMessage();
        });
    } else {
        return false;
    }
}