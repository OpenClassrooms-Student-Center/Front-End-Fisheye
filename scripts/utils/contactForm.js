function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    // Added behaviour for the rest of the page
    const mediasSection = document.querySelector(".medias_section");
    mediasSection.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    // Added behaviour for the rest of the page
    const mediasSection = document.querySelector(".medias_section");
    mediasSection.style.display = "grid";
}
