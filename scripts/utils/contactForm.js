const body = document.querySelector("body");
const main = document.querySelector("#main");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".form__close");

export function displayModal() {
	main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "flex";
    closeBtn.focus();
}


export function closeModal() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    modal.style.display = "none"
}

export function closeModalWithEsc() {
    document.addEventListener('keydown', event => {
        const code = event.code
        if (modal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
            closeModal()
        }
    })
}
