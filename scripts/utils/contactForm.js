function displayModal() {
    const contact = document.getElementById("contact_modal");
	contact.style.display = "flex";
}

function displayLightbox() {
    const lightbox = document.getElementById("lightbox_modal");
	lightbox.style.display = "flex";
}

function closeModal() {
    const contact = document.getElementById("contact_modal");
    contact.style.display = "none";
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox_modal");
    lightbox.style.display = "none";
}
