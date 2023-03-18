"use_strict";

const form = document.querySelector("form");

function firstField() {
    const first = document.querySelector("form div:nth-child(1) input");
    first.setAttribute("type","text");
    first.setAttribute("name","first");
}

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

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    firstField();
    lastField();
    emailField();
    messageField();
    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


