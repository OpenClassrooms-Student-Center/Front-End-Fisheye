import { getPhotographersById } from "./getPhotographerById.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");

// get the name of the photographer and display it in the form head
async function displayNameInForm() {
    const photographer = await getPhotographersById();
    const { name } = photographer
    const title = document.querySelector(".form__title")
    title.innerHTML = `Contactez-moi<br>${name}`
}

function displayForm() {
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    displayNameInForm();
    form.style.display = "flex";
    const input = document.querySelector(".form__input");
    input.focus();
    closeContactForm();
    closeFormWithEsc();
}

export function openContactForm() {
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.addEventListener("click", displayForm);
}

function closeForm() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none"
    form.style.display = "none";
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.focus();
}

function closeContactForm() {
    const closeBtn = document.querySelector(".form__close");
    closeBtn.addEventListener("click", closeForm);
}

function closeFormWithEsc() {
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
