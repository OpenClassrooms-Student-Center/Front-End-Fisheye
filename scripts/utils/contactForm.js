function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    document.documentElement.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.documentElement.style.overflow = 'visible';
}
