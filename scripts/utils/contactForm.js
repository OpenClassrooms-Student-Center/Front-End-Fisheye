function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.toggle('hidden');

}
