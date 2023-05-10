export function displayModal() {
    const modal = document.querySelector(".contact__modal");
	modal.style.display = "block";
}

export function closeModal() {
    const modal = document.querySelector(".contact__modal");
    modal.style.display = "none";
}
