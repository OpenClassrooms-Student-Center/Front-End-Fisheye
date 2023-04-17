"use_strict";

// DOM elements
const modalElt = document.getElementById("contact-modal");
const firstNameElt = document.querySelector(".modal div:nth-child(2) input");
const lastNameElt = document.querySelector(".modal div:nth-child(3) input");
const emailElt = document.querySelector(".modal div:nth-child(4) input");
const messageElt = document.querySelector(".modal div:nth-child(5) textarea");
const formElt = document.querySelector(".modal form");
const successMessageElt = document.querySelector(".modal div:nth-child(1) p");

/**
 * 
 * @param {object} photographer
 * @returns {object}
 */
function photographerContactFormFactory(photographer) {
    const [{ name }] = photographer;

    function getUserContactFormDOM() {
        const titleFormElt = document.querySelector("#contact-modal h2");
        const namePhotographerFormElt = document.createTextNode(" " + name);
        titleFormElt.appendChild(namePhotographerFormElt);
    }

    return { getUserContactFormDOM }
}

function displayModal() {
	modalElt.style.display = "block";
    mainElt.setAttribute("aria-hidden","true");
    modalElt.setAttribute("aria-hidden","false");
    closeFormModalWithKeyboard();
}

// close modal on keydown "echap" keyborad button
function closeFormModalWithKeyboard() {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            closeModal();
        }
     });
}

function closeModal() {
    modalElt.style.display = "none";
    mainElt.setAttribute("aria-hidden","false");
    modalElt.setAttribute("aria-hidden","true");
    formElt.reset();
    successMessageElt.remove();
    const spanElts = document.querySelectorAll("span");
    spanElts.forEach((spanElt) => {
        spanElt.remove();
    });
}

/**
 * 
 * @returns {boolean}
 */
function validateFirstName() {
    const removeErrorMessage = document.querySelector(".modal div:nth-child(2) span");

    if (!firstNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divFirstElt = document.querySelector(".modal div:nth-child(2)");
        const spanErrorMessage = document.querySelectorAll(".modal div:nth-child(2) span");
        const errorMessage = "Prénom obligatoire avec au minimum 2 lettres";
        const ariaDescription = "first-validate";
        createErrorMessage(divFirstElt, errorMessage, spanErrorMessage, ariaDescription);

        return false;
    } 
    else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true
}

/**
 * 
 * @returns {boolean}
 */
function validateLastName() {
    const removeErrorMessage = document.querySelector(".modal div:nth-child(3) span");
    
    if (!lastNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divLastElt = document.querySelector(".modal div:nth-child(3)");
        const errorMessage = "Nom obligatoire avec au minimum 2 lettres";
        const spanErrorMessage = document.querySelectorAll(".modal div:nth-child(3) span");
        const ariaDescription = "last-validate";
        createErrorMessage(divLastElt, errorMessage, spanErrorMessage, ariaDescription);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

/**
 * 
 * @returns {boolean}
 */
function validateEmail() {
    const removeErrorMessage = document.querySelector(".modal div:nth-child(4) span");
    
    if (!emailElt.value.match(/^[\w\-.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/)) {
        const divEmailElt = document.querySelector(".modal div:nth-child(4)");
        const errorMessage = "Veuillez renseigner une adresse mail valide";
        const spanErrorMessage = document.querySelectorAll(".modal div:nth-child(4) span");
        const ariaDescription = "email-validate";
        createErrorMessage(divEmailElt, errorMessage, spanErrorMessage, ariaDescription);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

/**
 * 
 * @returns {boolean}
 */
function validateMessage() {
    const removeErrorMessage = document.querySelector(".modal div:nth-child(5) span");
    
    if (!messageElt.value.match(/^[\w\-.?!+*\/\n, ()&#:;'"áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{20,700}$/)) {
        const divMessageElt = document.querySelector(".modal div:nth-child(5)");
        const errorMessage = "Votre message doit etre compris entre 20 et 700 caractères";
        const spanErrorMessage = document.querySelectorAll(".modal div:nth-child(5) span");
        const ariaDescription = "message-validate";
        
        createErrorMessage(divMessageElt, errorMessage, spanErrorMessage, ariaDescription);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

/**
 * 
 * @param {object} divElt 
 * @param {string} errorMessage 
 * @param {object} spanErrorMessage 
 */
function createErrorMessage(divElt, errorMessage, spanErrorMessage, ariaDescription) {
    const spanElt = document.createElement("span");
    spanElt.setAttribute("id",ariaDescription);
    spanElt.textContent = errorMessage;
    divElt.appendChild(spanElt);

    if (spanErrorMessage.length > 0) {
        spanElt.remove();
    }
}

function displaySuccessMessage() {
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
        formElt.addEventListener("submit", (event) => {
            console.log(" ================================ ");
            console.log("Prénom: " + firstNameElt.value);
            console.log("Nom: " + lastNameElt.value);
            console.log("Email: " + emailElt.value);
            console.log("Message: " + messageElt.value);

            event.preventDefault();
            formElt.reset();
            displaySuccessMessage();
        });
    } else {
        return false;
    }
}