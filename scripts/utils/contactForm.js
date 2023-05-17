import { getPhotographersById } from "./getPhotographerById.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");
const modal = document.querySelector(".modal");
// const closeBtn = document.querySelector(".form__close");
const input = document.querySelector(".form__input");

function displayModal() {
	main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    input.focus();
}

async function displayNameInModal() {
    const photographer = await getPhotographersById();
    const { name } = photographer
    const title = document.querySelector(".form__title")
    title.innerHTML += `<br>${name}`
}

export function openContactModal() {
const contactBtn = document.querySelector(".contact__button");
contactBtn.addEventListener("click", displayModal);
contactBtn.focus();
displayNameInModal();
}

function closeModal() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none"
}

export function closeContactModal() {
const closeBtn = document.querySelector(".form__close");
closeBtn.addEventListener("click", closeModal);
const contactBtn = document.querySelector(".contact__button");
contactBtn.focus();
}
export function closeModalWithEsc() {
    document.addEventListener('keydown', event => {
        const code = event.code
        if (modal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
            closeModal()
        }
    })
}
