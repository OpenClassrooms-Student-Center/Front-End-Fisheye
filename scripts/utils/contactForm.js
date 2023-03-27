"use_strict";

// DOM elements
const formElt = document.querySelector("form");
const modalElt = document.getElementById("contact_modal");
const sendButtonElt = document.querySelector("form .contact_button");
const firstNameElt = document.querySelector("form div:first-child input");

// functions

function editModal() {
    modalElt.style.position = "absolute";
    modalElt.style.top = "60px";
    modalElt.style.width = "100%";
}

function editForm() {
    formElt.style.marginTop = "50px";
}

// create first field
function createFirstField() {
    
    firstNameElt.setAttribute("type","text");
    firstNameElt.setAttribute("name","first");
}

// create last field
function createLastField() {
    const divLastElt = document.createElement("div");
    const lastElt = document.createElement("input");
    const labelLastElt = document.createElement("label");
    formElt.appendChild(divLastElt).appendChild(labelLastElt);
    labelLastElt.append("Nom");
    lastElt.setAttribute("type","text");
    lastElt.setAttribute("name","last");
    divLastElt.appendChild(lastElt);
}

// create email field
function createEmailField() {
    const divEmailElt = document.createElement("div");
    const emailElt = document.createElement("input");
    const labelEmailElt = document.createElement("label");
    formElt.appendChild(divEmailElt).appendChild(labelEmailElt);
    labelEmailElt.append("Email");
    emailElt.setAttribute("type","email");
    emailElt.setAttribute("name","email");
    divEmailElt.appendChild(emailElt);
}

// create message field
function createMessageField() {
    const divMessageElt = document.createElement("div");
    const labelMessageElt = document.createElement("label");
    const messageElt = document.createElement("textarea");
    formElt.appendChild(divMessageElt).appendChild(labelMessageElt);
    labelMessageElt.append("Votre message");
    messageElt.setAttribute("name","message");
    messageElt.style.width = "100%";
    messageElt.style.height = "180px"
    divMessageElt.appendChild(messageElt);
}

// move button element to end of form
function moveSendButtonElt() {
    const lastDivElt = document.querySelector("form div:last-child");
    lastDivElt.after(sendButtonElt);
}

function photographerContactFormFactory(photographerName) {
    const [{ name }] = photographerName;

    function getUserContactFormDOM() {
        const titleFormElt = document.querySelector("#contact_modal h2");
        titleFormElt.style.textAlign = "left";
        const namePhotographerFormElt = document.createTextNode(" " + name);
        titleFormElt.appendChild(namePhotographerFormElt);

        editModal();
        editForm();
        createFirstField();
        createLastField();
        createEmailField();
        createMessageField();
        moveSendButtonElt();
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
}

function displayErrorMessage(divElt, errorMessage, spanErrorMessage) {
    const spanElt = document.createElement("span");
    spanElt.textContent = errorMessage;
    divElt.appendChild(spanElt);

    if (spanErrorMessage.length > 0) {
        spanElt.remove();
    }
}

function displayFirstName() {
    const removeErrorMessage = document.querySelector("form div:nth-child(1) span");

    if (!firstNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divFirstElt = document.querySelector("form div:nth-child(1)");
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(1) span");
        const errorMessage = "Prénom obligatoire avec au minimum 2 lettres";

        displayErrorMessage(divFirstElt, errorMessage, spanErrorMessage);

        return false;
    } 
    else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true
}

function displayLastName(lastNameElt) {
    const removeErrorMessage = document.querySelector("form div:nth-child(2) span");
    
    if (!lastNameElt.value.match(/^[a-z]{2,}$/i)) {
        const divLastElt = document.querySelector("form div:nth-child(2)");
        const errorMessage = "Nom obligatoire avec au minimum 2 lettres";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(2) span");
        
        displayErrorMessage(divLastElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

function displayEmail(emailElt) {
    const removeErrorMessage = document.querySelector("form div:nth-child(3) span");
    
    if (!emailElt.value.match(/^[\w\-.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,4}$/)) {
        const divEmailElt = document.querySelector("form div:nth-child(3)");
        const errorMessage = "Veuillez renseigner une adresse mail valide";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(3) span");
        
        displayErrorMessage(divEmailElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

function displayMessage(messageElt) {
    const removeErrorMessage = document.querySelector("form div:nth-child(4) span");
    
    if (!messageElt.value.match(/^[\w\-.?!, ]{3,}$/)) {
        const divMessageElt = document.querySelector("form div:nth-child(4)");
        const errorMessage = "Votre message doit etre compris entre 30 et 500 caractères";
        const spanErrorMessage = document.querySelectorAll("form div:nth-child(4) span");
        
        displayErrorMessage(divMessageElt, errorMessage, spanErrorMessage);

        return false;
    } else if (removeErrorMessage) {
        removeErrorMessage.remove();
    }

    return true;
}

// display user data in console
function displayUserDataInConsole() {
    const lastNameElt = document.querySelector("form div:nth-child(2) input");
    const emailElt = document.querySelector("form div:nth-child(3) input");
    const messageElt = document.querySelector("form div:nth-child(4) textarea")

    const firstName = displayFirstName();
    const lastName = displayLastName(lastNameElt);
    const email = displayEmail(emailElt);
    const message = displayMessage(messageElt);

    if (firstName && lastName && email && message) {
        console.log("Prénom: " + firstNameElt.value);
        console.log("Nom: " + lastNameElt.value);
        console.log("Email: " + emailElt.value);
        console.log("Message: " + messageElt.value);
        formElt.reset();

    } else {
        return false;
    }
}