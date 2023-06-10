import { getPhotographersById } from "./getPhotographerById.js";

const body = document.querySelector("body");
const main = document.querySelector("main");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const mainButtons = main.querySelectorAll("button");
const a = document.querySelector("a");


// récupération du nom du photographe et injection de ce nom dans le html
async function renderNameInForm() {
    const photographer = await getPhotographersById();
    const { name } = photographer
    const title = document.querySelector(".form__title")
    title.innerHTML = `Contactez-moi<br>${name}`
}

// on affiche le formulaire avec display flex en passant également l'aria-hidden à false. Tout le reste de la page est en aria-hidden true afin qu'il ne soit pas pris en compte par les lecteurs d'écran. De même on passe tous les élements extérieurs à la modale en tabindex = -1 afin de ne pas pouvoir naviguer dessus à l'aide du clavier lorsque la modale est ouverte
function renderForm() {
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    header.setAttribute("aria-hidden", "true");
    footer.setAttribute("aria-hidden", "true");
    a.setAttribute("aria-hidden", "true");
    a.setAttribute("tabindex", "-1");

    const mediaButtons = document.querySelectorAll(".media__btn");
    mediaButtons.forEach(function(button) {
      button.setAttribute("tabindex", "-1");
    });
    const formButton = document.querySelector(".contact__button");
    formButton.setAttribute("tabindex", "-1")
    mainButtons.forEach(function(button) {
      button.setAttribute("tabindex", "-1");
    });
    renderNameInForm();
    form.style.display = "flex";
    const input = document.querySelector(".form__input");
    input.focus();
    closeContactFormOnClick();
    closeFormWithEsc();
}
// Appel de la fonction renderForm() au click sur le bouton contact
function openContactForm() {
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.addEventListener("click", renderForm);
}

// Fonction inverse à renderForm(), passage de aria-hidden à true pour la modale et remsie en place des tabindex pour pouvoir naviquer à l'aide du clavier
function closeForm() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none"
    form.style.display = "none";
    header.setAttribute("aria-hidden", "false");
    footer.setAttribute("aria-hidden", "false");
    a.setAttribute("aria-hidden", "false");
    a.setAttribute("tabindex", "0");
    const contactBtn = document.querySelector(".contact__button");
    contactBtn.focus();

    const mediaButtons = document.querySelectorAll(".media__btn");
    mediaButtons.forEach(function(button) {
        button.setAttribute("tabindex", "0");
    });
    const formButton = document.querySelector(".contact__button");
    formButton.setAttribute("tabindex", "0")
    mainButtons.forEach(function(button) {
        button.setAttribute("tabindex", "0");
    });
}

// Appel de la fonction closeForm() au click sur le bouton de fermeture de la modale
function closeContactFormOnClick() {
    const closeBtn = document.querySelector(".form__close");
    closeBtn.addEventListener("click", closeForm);
}
// Possibilité pour l'utilisateur d'appeler la fonction closeForm() à l'aide du bouton Echap du clavier
function closeFormWithEsc() {
    document.addEventListener('keydown', event => {
        const code = event.code
        if (modal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
            closeForm()
        }
    })
}

// Si le formulaire est valide, on log en console un tableau avec les valeurs d'input, puis on reset le formulaire et on le ferme
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
        const icons = document.querySelectorAll(".form__input-valid");
        icons.forEach(icon => icon.remove())
        closeForm();
    })
}

// Création d'un objet contenant les informations nécessaires pour chaque input
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

// On teste la validité de la valeur renseignée pour chaque input, si valide, on affiche un check vert pour donner du feedback visuel à l'utilisateur, sinon on affiche une span détaillant ce qui est attendu
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
