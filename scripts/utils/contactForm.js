const main = document.querySelector("#main");
const modal = document.querySelector(".modal");

export function displayModal() {
	main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "flex"
}


export function closeModal() {
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none"

}
