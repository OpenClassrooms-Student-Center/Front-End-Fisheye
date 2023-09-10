function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove('hidden');
}

function closeContactModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.toggle('hidden');

}
