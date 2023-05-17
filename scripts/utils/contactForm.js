import { getPhotographersById } from "./getPhotographerById.js";
import { closeModal, displayModal } from "./modal.js";

const modal = document.querySelector(".modal");
const form = document.querySelector(".form");

async function displayNameInForm() {
    const photographer = await getPhotographersById();
    const { name } = photographer
    const title = document.querySelector(".form__title")
    title.innerHTML = `Contactez-moi<br>${name}`
}

function displayForm() {
    displayModal();
    displayNameInForm();
    form.style.display = "flex";
    const input = document.querySelector(".form__input");
    input.focus();
}

export function openContactForm() {
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.addEventListener("click", displayForm);
}

function closeForm() {
    closeModal();
    form.style.display = "none";
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.focus();
}

export function closeContactForm() {
    const closeBtn = document.querySelector(".form__close");
    closeBtn.addEventListener("click", closeForm);
}

export function closeFormWithEsc() {
    document.addEventListener('keydown', event => {
        const code = event.code
        if (modal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
            closeForm()
        }
    })
}

function submitForm() {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        console.log({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value
        });
        form.reset();
        closeForm();
    })
}
submitForm();
