export function displayModal(event) {
    event.preventDefault()
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
