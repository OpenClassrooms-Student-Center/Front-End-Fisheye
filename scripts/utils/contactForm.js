const body = document.querySelector("body");
const main = document.querySelector("#main");
const modal = document.querySelector(".modal");

export function displayModal() {
	main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "flex";
    body.classList.add("no-scroll");
}


export function closeModal() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none"
    body.classList.remove("no-scroll");

}
