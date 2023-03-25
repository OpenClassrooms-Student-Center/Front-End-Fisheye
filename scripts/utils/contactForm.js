"use_strict";

// DOM elements
const formElt = document.querySelector("form");
const modalElt = document.getElementById("contact_modal");

// functions
// create first field
function createFirstField() {
    const firstElt = document.querySelector("form div:nth-child(1) input");
    firstElt.setAttribute("type","text");
    firstElt.setAttribute("name","first");
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
    const sendButtonElt = document.querySelector("form .contact_button");
    lastDivElt.after(sendButtonElt);
}

function photographerNameFactory(photographerName) {
    const [{ name }] = photographerName;

    const nameElt = document.createTextNode(" " + name);
    const titleElt = document.querySelector("#contact_modal h2");
    titleElt.style.textAlign = "left";
    titleElt.appendChild(nameElt);
}

function editForm() {
    formElt.style.marginTop = "50px";

    createFirstField();
    createLastField();
    createEmailField();
    createMessageField();
    moveSendButtonElt();
}

// open modal
function displayModal() {
	modalElt.style.display = "block";
    modalElt.style.position = "absolute";
    modalElt.style.top = "60px";
    modalElt.style.width = "100%";

    editForm();
}

// close modal
function closeModal() {
    modalElt.style.display = "none";
}
