const contactButton = document.querySelector(".contact_button");
const closeForm = document.querySelector(".close-modal");
const modal = document.getElementById("contact_modal");

function displayModal() {
    
	modal.style.display = "block";
}

function closeModal() {
    
    modal.style.display = "none";
}

contactButton.addEventListener("click", displayModal);
closeForm.addEventListener("click", closeModal);
