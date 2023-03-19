"use_strict";

// DOM elements
const form = document.querySelector("form");

// functions

// create first field
function firstField() {
    const first = document.querySelector("form div:nth-child(1) input");
    first.setAttribute("type","text");
    first.setAttribute("name","first");
}

// create last field
function lastField() {
    const divLast = document.createElement("div");
    const last = document.createElement("input");
    const labelLast = document.createElement("label");
    form.appendChild(divLast).appendChild(labelLast);
    labelLast.append("Nom");
    last.setAttribute("type","text");
    last.setAttribute("name","last");
    divLast.appendChild(last);
}

// create email field
function emailField() {
    const divEmail = document.createElement("div");
    const email = document.createElement("input");
    const labelEmail = document.createElement("label");
    form.appendChild(divEmail).appendChild(labelEmail);
    labelEmail.append("Email");
    email.setAttribute("type","email");
    email.setAttribute("name","email");
    divEmail.appendChild(email);
}

// create message field
function messageField() {
    const divMessage = document.createElement("div");
    const labelMessage = document.createElement("label");
    const message = document.createElement("textarea");
    form.appendChild(divMessage).appendChild(labelMessage);
    labelMessage.append("Votre message");
    message.setAttribute("name","message");
    message.style.width = "100%";
    message.style.height = "180px"
    divMessage.appendChild(message);
}

// move button element to end of form
function buttonElement() {
    const lastDiv = document.querySelector("form div:last-child");
    const sendButton = document.querySelector("form .contact_button");
    lastDiv.after(sendButton);
}

// open modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    firstField();
    lastField();
    emailField();
    messageField();
    buttonElement();
}

// close modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


