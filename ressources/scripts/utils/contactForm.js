import { getPhotographersById } from "./getPhotographerById.js";

const body = document.querySelector("body");
const main = document.querySelector("main");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");

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
    closeContactFormOnClick();
    closeFormWithEsc();
}
function openContactForm() {
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
function closeContactFormOnClick() {
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
        const firstName = document.getElementById("prenom");
        const lastName = document.getElementById("nom");
        const email = document.getElementById("e-mail");
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


let informationObject = {
    "prenom": {
        regex: /\w{2,}/,
        errorMessage: "Le champ doit contenir au moins 2 caractères"
    },
    "nom": {
        regex: /\w{2,}/,
        errorMessage: "Le champ doit contenir au moins 2 caractères"
    },
    "e-mail": {
        regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        errorMessage: "L'adresse mail doit être valide"
    },
    "message": {
        regex: /^.{10,100}$/,
        errorMessage: "doit contenir entre 10 et 100 caractères"
    }
};
function validateInput(fieldset) {
    const input = fieldset.querySelector("input");
    const inputSpan = document.createElement("span");

    input.addEventListener("input", function() {
        const inputName = input.id;

        if (informationObject[inputName].regex.test(input.value)) {
            inputSpan.innerText = "";
            input.removeAttribute("aria-invalid")
            const icon = fieldset.querySelector(".form__input-valid");
            if (!icon) {
                const i = document.createElement("i")
                i.classList.add("fa-solid", "fa-check", "form__input-valid");
                fieldset.appendChild(i)
            }
        } else {
            inputSpan.innerText = informationObject[inputName].errorMessage;
            inputSpan.setAttribute("aria-label", inputSpan.innerText);
            input.setAttribute("aria-invalid", "true");
            fieldset.appendChild(inputSpan);
            const icon = fieldset.querySelector(".form__input-valid");
            if (icon) {
                icon.remove();
            }
        }
    });
}

export function initForm() {
    openContactForm();
    closeContactFormOnClick()
    closeFormWithEsc()
    const fieldset = document.querySelector("fieldset");
    const fieldsets = fieldset.querySelectorAll("fieldset");
    fieldsets.forEach(fieldset => {
        validateInput(fieldset)
    })
    submitForm()
}
